---
name: depurar
description: "Depura un error desde la causa - manda al agente depurador a reproducirlo y encontrar la causa raíz con evidencia, y después lo arregla con TDD (la prueba que falla primero, el arreglo mínimo, toda la suite en verde) con la aprobación de la persona. Úsalo cuando falla una prueba, cuando /sdd:entrada reprodujo un bug o cuando QA reporta un error."
argument-hint: "[el error, la prueba que falla o la carpeta de la entrada]"
---

# Depurar desde la causa

Primero se entiende, después se arregla. Arreglar el síntoma sin la causa es la forma más segura de que el bug vuelva.

## Lee primero

1. `CLAUDE.md`, `docs/kit/reglas.md`, `.claude/rules/` del área.
2. Si existe, `docs/specs/<NNN>/entrada.md` (el bug reproducido) y el requerimiento o la regla que dice qué es lo correcto.

## 1. Diagnóstico

Lanza el agente **depurador** (`sdd:depurador`) con el error o la prueba que falla. Muéstrale a la persona: la reproducción, las hipótesis descartadas, la causa raíz y el arreglo propuesto.

- Si no se reprodujo: detente y pide los datos que faltan.
- Si el arreglo depende de una regla que **no está escrita** (¿cuál es el valor correcto?), no la decidas: pregúntala. Si es grande, es un requerimiento (`/sdd:requerimiento`).

## 2. Arreglo con TDD (con aprobación)

Pregunta: «¿Arreglo con este cambio mínimo?». Con el sí:

1. **La prueba que falla:** si el depurador dijo que falta, escríbela primero y comprueba que falla por la causa encontrada.
2. **El arreglo mínimo:** solo lo que dice la causa raíz. Nada de mejoras de paso.
3. **Toda la suite** en verde. Si se rompe otra cosa, el arreglo no era el correcto: vuelve al diagnóstico.
4. **Nunca cambies una prueba existente para que pase**, salvo que la persona confirme que la prueba estaba mal (y por qué).
5. Commit chico: `fix: <qué> (causa: <una línea>)`.

## 3. Que no vuelva

- La prueba queda en la suite: es la **regla de regresión**, cada falla se vuelve un caso.
- Si el error vino de un agente (el agente escribió el bug), sugiere `/sdd:leccion` para que el equipo decida si va a una regla o a un caso de prueba del agente.

## Terminado cuando

- [ ] El error se reprodujo y la causa raíz tiene archivo y línea.
- [ ] Hay una prueba que falló por esa causa y ahora pasa.
- [ ] La suite completa está en verde.
- [ ] La persona aprobó el arreglo.
