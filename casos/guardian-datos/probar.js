// Casos del guardián de datos. Uso: node casos/guardian-datos/probar.js
// Cada caso dice si el guardián tiene que BLOQUEAR (2) o DEJAR PASAR (0).
const { spawnSync } = require("child_process");
const path = require("path");
const guardian = path.join(__dirname, "..", "..", "hooks", "guardian-datos.js");

const casos = [
  ["Leer .env", { tool_name: "Read", tool_input: { file_path: "C:/repo/.env" } }, 2],
  ["Leer .env.production", { tool_name: "Read", tool_input: { file_path: "/repo/.env.production" } }, 2],
  ["Leer .env.example (plantilla)", { tool_name: "Read", tool_input: { file_path: "/repo/.env.example" } }, 0],
  ["Leer una llave .pem", { tool_name: "Read", tool_input: { file_path: "/repo/certs/banco.pem" } }, 2],
  ["Leer credentials.json", { tool_name: "Read", tool_input: { file_path: "/repo/credentials.json" } }, 2],
  ["Leer código normal", { tool_name: "Read", tool_input: { file_path: "/repo/src/cuentas.js" } }, 0],
  ["cat .env por Bash", { tool_name: "Bash", tool_input: { command: "cat .env | grep DB" } }, 2],
  ["Get-Content .env por PowerShell", { tool_name: "PowerShell", tool_input: { command: "Get-Content .env.local" } }, 2],
  ["npm test por Bash", { tool_name: "Bash", tool_input: { command: "npm test" } }, 0],
  ["Escribir un C.I.", { tool_name: "Write", tool_input: { file_path: "/repo/docs/specs/001/requerimiento.md", content: "Dado el cliente con C.I. 4567123 SC" } }, 2],
  ["Escribir un carnet", { tool_name: "Edit", tool_input: { file_path: "/repo/x.md", new_string: "carnet de identidad nro 8765432" } }, 2],
  ["Escribir un número de cuenta", { tool_name: "Write", tool_input: { file_path: "/repo/x.md", content: "cuenta 3001245678" } }, 2],
  ["Escribir una tarjeta", { tool_name: "Write", tool_input: { file_path: "/repo/x.md", content: "pago con 4111 1111 1111 1111" } }, 2],
  ["Escribir cuenta de práctica 1001", { tool_name: "Write", tool_input: { file_path: "/repo/x.md", content: "Dado la cuenta 1001 con saldo Bs 12.500,00" } }, 0],
  ["Escribir código con montos", { tool_name: "Write", tool_input: { file_path: "/repo/src/a.js", content: "const LIMITE = 1000000; // Bs 10.000,00 en centavos" } }, 0],
  ["MultiEdit con C.I.", { tool_name: "MultiEdit", tool_input: { file_path: "/repo/x.md", edits: [{ new_string: "ok" }, { new_string: "CI: 1234567" }] } }, 2],
];

let fallas = 0;
for (const [nombre, ev, esperado] of casos) {
  const r = spawnSync("node", [guardian], { input: JSON.stringify({ cwd: process.cwd(), ...ev }), encoding: "utf8" });
  const ok = r.status === esperado;
  if (!ok) fallas++;
  console.log(`${ok ? "ok   " : "FALLA"} ${nombre} → ${r.status === 2 ? "bloquea" : "deja pasar"}${ok ? "" : ` (se esperaba ${esperado === 2 ? "bloquear" : "dejar pasar"})`}`);
}
console.log(fallas ? `\n${fallas} caso(s) fallan.` : `\nLos ${casos.length} casos pasan.`);
process.exit(fallas ? 1 : 0);
