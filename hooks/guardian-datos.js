#!/usr/bin/env node
// Guardián de datos del kit SDD (hook PreToolUse de Claude Code).
//
// Corre ANTES de cada lectura, escritura o comando del agente y lo bloquea si:
//   1. toca un archivo de secretos (.env, llaves, certificados, credenciales);
//   2. escribe texto que parece un dato de cliente (C.I., número de cuenta)
//      o que calza con un patrón propio del equipo.
//
// Es un control determinístico: no depende de que el modelo «se porte bien».
// Personalización, en el repositorio del equipo (no en el plugin):
//   docs/kit/datos-prohibidos.txt   un patrón (expresión regular) por línea
//   docs/kit/guardian-permitidos.txt  rutas donde no se revisa el CONTENIDO
//                                     (por ejemplo, datos sintéticos de prueba)
// Las líneas que empiezan con # son comentarios.
//
// Salida: código 0 deja pasar; código 2 bloquea y el mensaje le llega al agente.

const fs = require("fs");
const path = require("path");

const ARCHIVOS_SECRETOS = [
  { re: /(^|[\\/])\.env(\.(?!example$|sample$|template$|ejemplo$)[\w.-]+)?$/i, por: "archivo de variables de entorno (.env)" },
  { re: /\.(pem|key|pfx|p12|keystore|jks)$/i, por: "llave o certificado" },
  { re: /(^|[\\/])id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/i, por: "llave SSH" },
  { re: /(^|[\\/])(credentials|credenciales|secrets?|secretos?)(\.[\w-]+)?\.(json|ya?ml|txt|ini|toml)$/i, por: "archivo de credenciales" },
];

const DATOS_CLIENTE = [
  { re: /\b(c\.?\s?i\.?|carnet|c[ée]dula)(\s*(de identidad|n[°ºo.]?|nro\.?|:|#))*\s*\d{6,8}(\s?-?\s?\d[a-z])?\b/i, por: "un número de C.I." },
  { re: /\b(cuenta|cta\.?|nro\.?\s*de\s*cuenta)(\s*(n[°ºo.]?|nro\.?|:|#|bancaria))*\s*\d{10,16}\b/i, por: "un número de cuenta bancaria" },
  { re: /\b(?:\d[ -]?){15,16}\b/, por: "un número que parece de tarjeta" },
];

function leerLista(cwd, archivo) {
  try {
    return fs.readFileSync(path.join(cwd, "docs", "kit", archivo), "utf8")
      .split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  } catch {
    return [];
  }
}

function bloquear(msg) {
  process.stderr.write(
    `Bloqueado por el guardián de datos del kit SDD: ${msg}\n` +
    "Use datos inventados (por ejemplo «cuenta 1001») o pida a una persona que lo revise. " +
    "Si es un falso positivo, el equipo puede ajustar docs/kit/datos-prohibidos.txt o docs/kit/guardian-permitidos.txt.\n"
  );
  process.exit(2);
}

function rutaSecreta(p) {
  const limpia = String(p || "").replace(/["']/g, "");
  return ARCHIVOS_SECRETOS.find((s) => s.re.test(limpia));
}

let entrada = "";
process.stdin.on("data", (d) => (entrada += d));
process.stdin.on("end", () => {
  let ev;
  try {
    ev = JSON.parse(entrada);
  } catch {
    process.exit(0); // sin evento legible no hay nada que revisar
  }
  const cwd = ev.cwd || process.cwd();
  const herramienta = ev.tool_name || "";
  const ti = ev.tool_input || {};

  // 1. Archivos de secretos, por ruta.
  const rutas = [ti.file_path, ti.path, ti.notebook_path].filter(Boolean);
  for (const r of rutas) {
    const s = rutaSecreta(r);
    if (s) bloquear(`${herramienta} sobre «${path.basename(r)}», que es un ${s.por}.`);
  }
  if (herramienta === "Bash" || herramienta === "PowerShell") {
    const comando = String(ti.command || "");
    for (const palabra of comando.split(/[\s;&|<>()]+/)) {
      const s = rutaSecreta(palabra);
      if (s) bloquear(`el comando usa «${path.basename(palabra)}», que es un ${s.por}.`);
    }
  }

  // 2. Contenido que parece dato de cliente, solo en escrituras.
  const textos = [];
  if (ti.content) textos.push(ti.content);
  if (ti.new_string) textos.push(ti.new_string);
  if (Array.isArray(ti.edits)) for (const e of ti.edits) if (e && e.new_string) textos.push(e.new_string);
  if (!textos.length) process.exit(0);

  const destino = String(ti.file_path || "").replace(/\\/g, "/");
  const permitidos = leerLista(cwd, "guardian-permitidos.txt");
  if (destino && permitidos.some((p) => destino.includes(p.replace(/\\/g, "/")))) process.exit(0);

  const propios = leerLista(cwd, "datos-prohibidos.txt").map((l) => {
    try { return { re: new RegExp(l, "i"), por: `un dato prohibido por el equipo (${l})` }; } catch { return null; }
  }).filter(Boolean);

  for (const t of textos) {
    for (const d of [...DATOS_CLIENTE, ...propios]) {
      if (d.re.test(t)) bloquear(`el texto que se quiere escribir en «${path.basename(destino) || "el archivo"}» contiene ${d.por}.`);
    }
  }
  process.exit(0);
});
