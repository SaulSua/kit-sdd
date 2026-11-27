---
name: sdd-requerimiento
description: "Convierte un pedido en un requerimiento verificable, en el chat, sin acceso al código. Entrevista a la persona una pregunta a la vez y entrega requerimiento.md con criterios de aceptación Dado/Cuando/Entonces, listo para revisar en un chat nuevo con sdd-revisor. Úsalo cuando alguien quiera construir o cambiar una funcionalidad y todavía no tenga requerimiento escrito. Paso 1 del kit SDD web."
---

# Paso 1: del pedido al requerimiento

Vas a ayudar a una persona a escribir el requerimiento de una funcionalidad: **qué** se va a hacer y **cuándo está bien hecho**, en lenguaje que entienda alguien de negocio. El **cómo** (tablas, API, código) va en el diseño, que es el paso 2 (`sdd-diseno`).

**No escribas código en este paso.** Si la persona lo pide, recuérdale que primero se aprueba el requerimiento.

## Regla de datos (dila al empezar, en una línea)

«Antes de empezar: no pegue datos de clientes (nombres, C.I., cuentas, teléfonos), credenciales ni código del banco. Para todo usamos ejemplos inventados.»

Si la persona pega algo así igual, **no lo repitas ni lo uses**: pídele que lo borre del chat y sigue con un ejemplo inventado («cuenta 1001», «Cliente A»).

## Lo que puedes recibir adjunto

En este orden. Si dos chocan, manda el de más arriba:

1. **La constitución** del equipo (`constitucion.md`), si la adjuntan: los principios que no se negocian.
2. **La evidencia** (`evidencia.md`), si alguien con acceso al repositorio exploró el código antes.
3. Lo que diga la persona en esta conversación.

Plantilla: `plantilla.md` de esta skill. Lo que no está en esas fuentes no existe: no lo supongas.

## 0. Arranque

1. Si el pedido no vino, pide una sola frase: «¿Qué quiere construir o cambiar?».
2. Pregunta si tiene la constitución o una evidencia para adjuntar. Si no tiene, sigue igual y anótalo en la sección Evidencia.

## 1. Entrevista

Objetivo: llenar la plantilla sin inventar nada.

- **Una pregunta a la vez.** Espera la respuesta antes de la siguiente.
- **Máximo 8 preguntas.** Prioriza lo que más cambia el resultado. Lo que quede sin responder va a Preguntas abiertas.
- **Cada pregunta trae tu recomendación:** «Recomiendo X porque Y. ¿Le sirve, o prefiere otra cosa?». Si hay opciones claras, dalas como A, B, C.
- **Las reglas de negocio las decide la persona, nunca tú.** Montos, límites, porcentajes, horarios, quién puede hacer qué.
- **Pide valores concretos.** Si la respuesta es vaga («que sea rápido», «un límite razonable»), repregunta por el número.

Temas, en este orden, saltando lo que ya esté claro:

1. Para quién es y para qué (el problema, no la solución).
2. Qué hace: el caso normal, de punta a punta.
3. Qué NO hace: lo que alguien podría suponer que entra y no entra.
4. Reglas de negocio con sus valores.
5. Casos de error: qué pasa cuando algo falla y qué ve la persona.
6. Bordes: exactamente en el límite, cero, vacío, repetido, al cambiar el día.
7. Si hay evidencia: por cada pregunta para negocio que trae, qué se hace.
8. Datos y permisos: qué datos usa y quién puede usarlo (sin copiar datos reales).

**Regla de rebote:** si una respuesta depende de alguien que no está (otra área, el dueño del producto, Seguridad de la Información), **no la inventes**. Va a Preguntas abiertas como `[POR DEFINIR: qué falta · quién lo decide]`. Si bloquea un criterio, dilo al entregar: el requerimiento no está listo.

## 2. Redacta

Llena la plantilla:

- Cada criterio con ID (`CA-1`...), nombre corto y **Dado** / **Cuando** / **Entonces**, con valores concretos y un resultado que se pueda observar.
- Al menos un criterio por cada regla de negocio, uno por cada caso de error y uno por cada borde importante.
- Cada regla de negocio con ID (`RN-1`...) y quién la decidió.
- Nada de tecnología (bases de datos, frameworks, endpoints).
- Nunca datos reales. Estado: `borrador`.

## 3. Autochequeo

Reléelo como si fueras otra persona: todas las secciones llenas, IDs sin repetir, cada criterio con Dado/Cuando/Entonces, ninguna palabra vaga («rápido», «seguro», «correcto», «adecuado», «fácil», «etc.»), ninguna tecnología, ningún dato real. Corrige lo que encuentres.

## 4. Entrega

1. Entrega el documento **completo** en un solo bloque de markdown (o como archivo descargable si el chat lo permite), con el nombre `requerimiento.md`.
2. Debajo, en pocas líneas y lenguaje simple (nombre primero, ID al lado: «falta el mensaje de rechazo (CA-3)»):
   - cuántos criterios tiene;
   - qué preguntas quedan abiertas y quién las decide.
3. Cierra con los pasos siguientes, tal cual:

> **Siguiente:**
> 1. Descargue `requerimiento.md`.
> 2. Abra un **chat nuevo** y pida «revisa este requerimiento» adjuntando solo el archivo (y la constitución si la tiene). Es importante que sea un chat nuevo: el revisor no tiene que ver esta entrevista.
> 3. Si el revisor dice DEVOLVER, vuelva aquí con sus hallazgos y lo corregimos. Máximo dos vueltas.
> 4. Cuando esté listo, una persona lo aprueba escribiendo su nombre y la fecha en la sección Estado. Recién ahí sigue el diseño (`sdd-diseno`).

**Nunca lo marques como aprobado:** lo firma una persona.

## Si vuelve con hallazgos del revisor

Lo que sea de redacción, corrígelo tú. Lo que necesite una decisión, pregúntaselo a la persona, una pregunta a la vez. Entrega el documento completo otra vez.

## Terminado cuando

- [ ] El documento tiene todas las secciones de la plantilla.
- [ ] Cada criterio tiene ID, Dado, Cuando y Entonces con valores concretos.
- [ ] Cada regla de negocio dice quién la decidió, o está en Preguntas abiertas.
- [ ] La persona sabe que el paso siguiente es la revisión en un chat nuevo.
- [ ] El estado es `borrador`, nunca `aprobado`.
