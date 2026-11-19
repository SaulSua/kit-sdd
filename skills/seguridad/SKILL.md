---
name: seguridad
description: "Revisión de seguridad del código generado de una funcionalidad o un pull request, como código de un tercero - corre el agente revisor-seguridad con OWASP como lista de control y las reglas del banco, deja docs/specs/<NNN>/seguridad.md con los hallazgos y lo que se hizo con cada uno, y opcionalmente arma el borrador de la guía de buenas prácticas para Seguridad de la Información. Úsalo antes de aprobar un PR y en la revisión cruzada entre equipos."
argument-hint: "[carpeta de la funcionalidad, rama o número de PR]"
---

# Seguridad del código generado

El código que escribe la IA se revisa **como código de un tercero**. Que pase las pruebas no dice nada de si es seguro.

## Lee primero

1. `docs/kit/politica-datos.md`, `docs/kit/reglas-seguridad.md` (si existe: las reglas propias del banco mandan), `docs/constitucion.md`.
2. Si es una funcionalidad: `diseno.md` (amenazas e invariantes) y `tareas.md`.

Plantilla: `docs/kit/plantillas/seguridad.md` si existe; si no, `plantilla.md` de esta carpeta.

## 1. Qué se revisa

- Una funcionalidad: el diff de su rama contra la principal (`git diff main...<rama>`).
- Un PR: su diff.
- **Revisión cruzada:** el equipo A revisa el código del equipo B. Quien lo construyó no lo revisa.

## 2. Revisión

Lanza el agente **revisor-seguridad** (`sdd:revisor-seguridad`) con lo que hay que revisar y la carpeta de la funcionalidad. Si el cambio es grande, uno por área (backend, frontend), en paralelo.

Comprueba tú los críticos: abre el archivo y la línea. Para cada uno, si se puede, **escribe la prueba que lo demuestra** (una entrada que abusa del control), en una rama, sin arreglar todavía.

## 3. Registro

Llena `docs/specs/<NNN>/seguridad.md`: cada hallazgo con su gravedad y **qué se hizo**: corregido (commit), aceptado como riesgo (quién lo aceptó y por qué), o rebotado al diseño. **Un crítico no se acepta como riesgo sin Seguridad de la Información.**

Los arreglos se hacen con `/sdd:depurar` o `/sdd:implementar` (prueba primero), no en este skill.

## 4. Guía de buenas prácticas (opcional)

Si la persona lo pide, arma o actualiza `docs/kit/guia-buenas-practicas-seguridad.md` desde `guia.md` de esta carpeta, sumando lo aprendido en esta revisión: es un **borrador para Seguridad de la Información**.

## Terminado cuando

- [ ] El revisor corrió sobre el diff completo.
- [ ] Cada crítico se comprobó en el código.
- [ ] `seguridad.md` dice qué se hizo con cada hallazgo.
- [ ] Ningún crítico quedó «aceptado» sin Seguridad de la Información.
