---
name: requerimiento
description: Convierte un pedido en un requerimiento verificable. Entrevista a la persona una pregunta a la vez, redacta docs/specs/<NNN-funcionalidad>/requerimiento.md con criterios de aceptación Dado/Cuando/Entonces y lo hace revisar por el agente revisor-requerimiento antes de entregarlo para aprobación humana. Úsalo cuando alguien quiera construir o cambiar una funcionalidad y todavía no tenga requerimiento escrito.
argument-hint: "[la funcionalidad en una frase]"
---

# Del pedido al requerimiento

Vas a ayudar a una persona a escribir el requerimiento de una funcionalidad: **qué** se va a hacer y **cuándo está bien hecho**, en lenguaje que entienda alguien de negocio. El **cómo** (tablas, API, código) no va aquí: va en el diseño técnico, que es el paso siguiente.

**No escribas código en este skill.** Si la persona pide código, recuérdale que primero se aprueba el requerimiento.

## Lee primero

En este orden. Si dos fuentes chocan, manda la que está más arriba:

1. `docs/constitucion.md`: los principios que no se negocian.
2. `docs/kit/reglas.md`: las reglas del equipo para el kit.
3. `docs/specs/<NNN-funcionalidad>/evidencia.md`, si existe: lo que hace hoy el código.
4. Lo que diga la persona en esta conversación.

Plantilla: `docs/kit/plantillas/requerimiento.md` si existe; si no, `plantilla.md` de la carpeta de este skill.

Lo que no está escrito en esos archivos no existe para el kit: no lo supongas.

## 0. La carpeta de la funcionalidad

1. Funcionalidad: si vino en el pedido (`$ARGUMENTS`), úsala. Si no, pide una sola frase: «¿Qué quiere construir o cambiar?».
2. Busca en `docs/specs/` una carpeta que ya sea de esta funcionalidad. **Si existe, usa esa:** una funcionalidad, una carpeta.
3. Si no existe, créala con el número siguiente y un nombre corto: `docs/specs/001-limite-diario/`, `002-...`. Tres cifras, minúsculas y guiones.
4. Sugiere trabajar en una rama con el mismo nombre (`git switch -c 001-limite-diario`). La persona decide.
5. Si la funcionalidad toca código que ya existe y no hay `evidencia.md`, sugiere correr primero `/sdd:explorar`. La persona decide si sigue igual.

## 1. Entrevista

Objetivo: llenar la plantilla sin inventar nada. Reglas:

- **Una pregunta a la vez.** Espera la respuesta antes de la siguiente.
- **Máximo 8 preguntas.** Prioriza lo que más cambia el resultado. Lo que quede sin responder va a Preguntas abiertas.
- **Cada pregunta trae tu recomendación:** «Recomiendo X porque Y. ¿Le sirve, o prefiere otra cosa?». Si hay opciones claras, dalas como A, B, C.
- **Lo que puedas saber leyendo el código o la evidencia, no lo preguntes: propónlo** y pide confirmación.
- **Las reglas de negocio las decide la persona, nunca tú.** Montos, límites, porcentajes, horarios, quién puede hacer qué.
- **Pide valores concretos.** Si la respuesta es vaga («que sea rápido», «un límite razonable»), repregunta por el número.

Temas a cubrir, en este orden, saltando lo que ya esté claro:

1. Para quién es y para qué (el problema, no la solución).
2. Qué hace: el caso normal, de punta a punta.
3. Qué NO hace: lo que alguien podría suponer que entra y no entra.
4. Reglas de negocio con sus valores.
5. Casos de error: qué pasa cuando algo falla y qué ve la persona.
6. Bordes: exactamente en el límite, cero, vacío, repetido, al cambiar el día.
7. Lo que encontró el explorador: por cada pregunta para negocio de la evidencia, qué se hace.
8. Datos y permisos: qué datos usa y quién puede usarlo (sin copiar datos reales).

### Regla de rebote

Si una respuesta depende de alguien que no está (otra área, el dueño del producto, Seguridad de la Información), **no la inventes ni la supongas**. Escríbela en Preguntas abiertas como `[POR DEFINIR: qué falta · quién lo decide]` y sigue con lo demás. Si esa pregunta bloquea un criterio, el requerimiento no puede quedar listo: dilo al entregar.

## 2. Redacta

Llena la plantilla en `docs/specs/<NNN-funcionalidad>/requerimiento.md`:

- Cada criterio de aceptación con ID (`CA-1`...), un nombre corto y las tres partes: **Dado** / **Cuando** / **Entonces**, con valores concretos y un resultado que se pueda observar.
- Al menos un criterio por cada regla de negocio, uno por cada caso de error y uno por cada borde importante.
- Cada regla de negocio con ID (`RN-1`...) y quién la decidió.
- Nada de tecnología (bases de datos, frameworks, endpoints).
- **Nunca datos reales:** ni nombres, C.I., cuentas, teléfonos ni credenciales. Usa ejemplos inventados («cuenta 1001»).
- Estado: `borrador`.

## 3. Autochequeo

Antes de pasarlo al revisor, reléelo como si fueras otra persona: todas las secciones llenas, IDs sin repetir, cada criterio con Dado/Cuando/Entonces, ninguna palabra vaga («rápido», «seguro», «correcto», «adecuado», «fácil»), ningún nombre de tecnología, ningún dato real. Corrige lo que encuentres.

## 4. Revisión independiente

Lanza el agente **revisor-requerimiento** (en el plugin se llama `sdd:revisor-requerimiento`) pasándole **solo la ruta del archivo**. No le cuentes la entrevista: tiene que juzgar el documento como lo leería otra persona.

Con su respuesta:

- Muéstrale a la persona el veredicto y la tabla de hallazgos, sin resumirla de más.
- Lo que sea de redacción, corrígelo tú.
- Lo que necesite una decisión, pregúntaselo a la persona (una pregunta a la vez).
- Vuelve a lanzar el revisor. **Máximo dos vueltas.** Si después de dos sigue en DEVOLVER, entrega el documento con los hallazgos pendientes a la vista.
- Con LISTO CON OBSERVACIONES, muéstrale las observaciones a la persona: ella decide si se corrigen ahora o quedan como preguntas abiertas.

## 5. Entrega

- Si el revisor dijo LISTO o LISTO CON OBSERVACIONES, cambia el estado a `revisado` y anota el veredicto y la fecha en «Revisado por el agente».
- **Nunca lo marques como aprobado:** la aprobación la firma una persona en la sección Estado (nombre y fecha).
- Reporta en pocas líneas y en lenguaje simple. **Nombre primero, ID al lado:** «falta el mensaje de rechazo (CA-3)», no «CA-3 incompleto».
  - dónde quedó el archivo;
  - cuántos criterios tiene;
  - qué preguntas quedan abiertas y quién las decide.
- Siguiente paso del método: el diseño técnico. No lo empieces sin que la persona lo pida.

## Terminado cuando

- [ ] El archivo existe en `docs/specs/<NNN-funcionalidad>/requerimiento.md` con todas las secciones de la plantilla.
- [ ] Cada criterio tiene ID, Dado, Cuando y Entonces con valores concretos.
- [ ] Cada regla de negocio dice quién la decidió, o está en Preguntas abiertas.
- [ ] El revisor corrió y su veredicto está anotado.
- [ ] El estado es `borrador` o `revisado`, nunca `aprobado`.
