---
name: reglas
description: Escribe las reglas del repositorio por carpeta (backend, frontend, pruebas, datos) en .claude/rules/, a partir de lo que el código ya hace. Manda al agente lector-de-reglas a proponerlas con evidencia, la persona las corrige y aprueba, y recién ahí se escriben. Cada archivo de reglas se carga solo cuando el agente trabaja en esas carpetas. Úsalo al empezar en un repositorio o cuando el agente se equivoca dos veces en lo mismo.
argument-hint: "[área opcional: backend, frontend, pruebas o datos]"
---

# Las reglas del repositorio, por carpeta

La constitución dice los principios de todo el proyecto. El `CLAUDE.md` dice los comandos y la estructura. **Las reglas por carpeta** dicen cómo se trabaja en cada parte: el backend no se escribe igual que el frontend ni que las pruebas. En Claude Code viven en `.claude/rules/*.md` y cada archivo puede decir a qué rutas aplica, así que **solo se cargan cuando hacen falta**.

## Lee primero

1. `docs/constitucion.md` y `CLAUDE.md`: lo que ya está escrito no se repite.
2. `.claude/rules/`, si existe: lo que ya hay se actualiza, no se duplica.
3. `docs/kit/reglas.md` y `docs/kit/politica-datos.md`.

**Cada regla en un solo lugar.** Si una regla ya está en la constitución o en el `CLAUDE.md`, no la copies a `.claude/rules/`: si se duplica, un día van a decir cosas distintas.

## 1. Proponer

1. Si `$ARGUMENTS` dice un área, trabaja solo esa. Si no, todas las que existan.
2. Lanza el agente **lector-de-reglas** (`sdd:lector-de-reglas`). Si el repositorio es grande, uno por área, en paralelo.
3. Comprueba tú dos o tres evidencias que citó, abriendo el archivo y la línea. Si una no se sostiene, sácala.

## 2. Que decida la persona

Muestra la propuesta **por área**, en una tabla corta: la regla, si es observada o sugerida, y una evidencia. Para cada área pregunta: «¿Aprueba estas reglas, quiere cambiar alguna, o sacar alguna?». Las **contradicciones** se las preguntas una por una: el equipo elige cuál es la forma correcta.

No escribas nada que la persona no aprobó.

## 3. Escribir

Por cada área aprobada, crea o actualiza `.claude/rules/<area>.md` con este formato:

```markdown
---
paths:
  - "src/api/**"
  - "src/servicios/**"
---

# Reglas del backend

- Montos en centavos enteros (`int`), nunca `float`. Ver `src/cuentas.js` (redondear).
- Toda consulta filtra por el usuario de la sesión, nunca por un id que manda el cliente.
- …
```

- `paths` con los patrones de ruta del área (los que propuso el agente y confirmó la persona). Sin `paths`, la regla se carga siempre: úsalo solo para reglas que valen en todo el repositorio, y en ese caso probablemente van en el `CLAUDE.md`.
- Una regla por línea, concreta y comprobable, con una referencia corta a dónde se ve.
- Sin datos reales ni credenciales.

Si el repositorio no admite `.claude/rules/` (versión vieja de Claude Code), la alternativa es un `CLAUDE.md` dentro de la carpeta del área (`src/api/CLAUDE.md`): se carga cuando el agente trabaja ahí.

## 4. Entrega

- Lista de archivos creados o cambiados, con cuántas reglas tiene cada uno.
- Las contradicciones que quedaron sin decidir.
- Sugiere: `git add .claude/rules && git commit -m "reglas del repositorio"`.
- Recuerda la regla de mantenimiento: **cuando el agente se equivoca dos veces en lo mismo, la corrección va a la regla del área.**

## Terminado cuando

- [ ] Cada área aprobada tiene su `.claude/rules/<area>.md` con `paths`.
- [ ] Ninguna regla está duplicada con la constitución o el `CLAUDE.md`.
- [ ] Cada regla es concreta y la aprobó una persona.
