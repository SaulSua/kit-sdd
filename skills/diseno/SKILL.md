---
name: diseno
description: "Escribe el diseño técnico de una funcionalidad a partir de su requerimiento aprobado: alternativas comparadas, decisiones registradas, modelo de datos, contrato de API, cómo se cumple cada criterio de aceptación, amenazas y lo que nunca puede romperse, y el chequeo contra la constitución. Usa al agente arquitecto para proponer alternativas y al revisor-diseno para revisarlo. Deja docs/specs/<NNN-nombre>/diseno.md. Úsalo después de que una persona aprobó el requerimiento."
argument-hint: "[carpeta o nombre de la funcionalidad]"
---

# Diseño técnico: el CÓMO, antes del código

El requerimiento dijo **qué** y **cuándo está bien**. El diseño dice **cómo** se construye, con argumentos. La IA escribe código tan bueno como el diseño que recibe.

**No escribas código de producción en este skill.** Fragmentos de ejemplo para explicar una decisión, sí.

## Lee primero

En este orden. Si chocan, manda el de más arriba:

1. `docs/constitucion.md`: **es la puerta**. El diseño no puede violarla sin una excepción justificada y aprobada.
2. `docs/kit/reglas.md`, `docs/kit/politica-datos.md` y `.claude/rules/` del área que toca.
3. `docs/specs/<NNN>/requerimiento.md`: **manda sobre el diseño**. Si el diseño necesita cambiar algo del requerimiento, se rebota, no se cambia en silencio.
4. `docs/specs/<NNN>/evidencia.md` y `entrada.md`, si existen.

Plantilla: `docs/kit/plantillas/diseno.md` si existe; si no, `plantilla.md` de esta carpeta.

## 0. Puerta de entrada

- El requerimiento tiene que estar **aprobado por una persona** (sección Estado, con nombre y fecha). Si dice `borrador` o `revisado`, **detente**: «El diseño empieza cuando el requerimiento está aprobado. ¿Quién lo aprueba?».
- Excepción: tamaño **normal** con la persona pidiendo explícitamente «requerimiento y diseño juntos, una sola aprobación». Anótalo en el Estado.
- Si hay preguntas abiertas en el requerimiento que bloquean el diseño, **rebota**: no las respondas tú.

## 1. Alternativas

Lanza el agente **arquitecto** (`sdd:arquitecto`) con la ruta del requerimiento y de la evidencia. Te devuelve dos o tres alternativas con sus costos. Muéstraselas a la persona en una tabla corta y **pídele que elija** (con tu recomendación). Esa elección es la decisión D-1.

Reglas que el arquitecto ya trae y tú confirmas: **primero se reusa lo que existe**; la alternativa más simple que cumple gana; la complejidad se tiene que ganar el lugar.

## 2. Redacta

Llena la plantilla en `docs/specs/<NNN>/diseno.md`:

- **Decisiones** con ID (`D-1`...): qué se decidió, alternativas descartadas y por qué.
- **Modelo de datos** y **contrato de API** en un solo lugar (si la API ya tiene un contrato, por ejemplo OpenAPI, se referencia y se dice qué cambia).
- **Trazabilidad:** cada criterio `CA-n` del requerimiento con la decisión o componente que lo cumple. Si un CA no tiene cómo cumplirse, es un hueco: rebota.
- **Seguridad por diseño:** amenazas (quién podría abusar de esto y cómo), y **invariantes** (`INV-1`...): lo que nunca puede romperse, por ejemplo «el saldo nunca queda negativo», «el límite se valida antes de mover el dinero».
- **Chequeo de la constitución:** cada principio, cumple o no. Si no cumple, va a la tabla de excepciones con por qué hace falta y qué alternativa más simple se descartó. **Una excepción la aprueba una persona.**
- Riesgos y preguntas abiertas.
- Estado: `borrador`.

## 3. Revisión independiente

Lanza el agente **revisor-diseno** (`sdd:revisor-diseno`) con **solo la ruta** del diseño. Muestra su veredicto, corrige lo de redacción, pregunta lo que necesite decisión. Máximo dos vueltas. Si el revisor marca que el diseño cambia el requerimiento, eso se rebota al requerimiento, no se arregla en el diseño.

## 4. Entrega

- Estado `revisado` con el veredicto; **la aprobación la firma una persona**.
- Si existe `docs/specs/<NNN>/estado.md`, actualízalo (paso actual: diseño revisado).
- Reporta: decisiones tomadas, invariantes, excepciones a la constitución y preguntas abiertas. Siguiente paso: `/sdd:tareas`.

## Terminado cuando

- [ ] Cada CA del requerimiento tiene cómo cumplirse.
- [ ] Hay al menos una alternativa descartada con su porqué.
- [ ] Hay amenazas e invariantes escritas.
- [ ] El chequeo de la constitución está completo y cada excepción tiene porqué.
- [ ] El revisor corrió; el estado no dice aprobado sin firma.
