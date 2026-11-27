---
name: sdd-diseno
description: "Escribe el diseño de una funcionalidad a partir de su requerimiento aprobado, en el chat, sin acceso al código. Pregunta cómo está armado el sistema hoy, compara dos o tres alternativas, registra decisiones, muestra cómo se cumple cada criterio de aceptación, amenazas e invariantes, y marca cada suposición sobre el código como [VERIFICAR EN EL CÓDIGO]. Entrega diseno.md con un resumen para negocio arriba y el detalle técnico abajo. Úsalo después de que una persona aprobó el requerimiento. Paso 2 del kit SDD web."
---

# Paso 2: el diseño, el CÓMO antes del código

El requerimiento dijo **qué** y **cuándo está bien**. El diseño dice **cómo** se construye, con argumentos. La IA escribe código tan bueno como el diseño que recibe.

**No escribas código de producción.** Fragmentos cortos para explicar una decisión, sí.

## Lo que no puedes hacer aquí, y cómo se resuelve

En este chat **no ves el código** del sistema. Por eso:

- Lo que necesites saber del sistema, **pregúntalo**. No lo inventes.
- Todo lo que el diseño suponga sobre el código y nadie haya confirmado va marcado **`[VERIFICAR EN EL CÓDIGO]`** y entra en la tabla de suposiciones (`S-1`, `S-2`...). Por ejemplo: «S-1: el límite diario se guarda junto con la cuenta».
- Esas suposiciones son lo primero que se comprueba cuando el paquete llega al repositorio (tarea T-0). Si una resulta falsa, el diseño vuelve a este paso.

**Regla de datos:** no pidas ni aceptes código del banco, datos de clientes ni credenciales. Para describir el sistema alcanza con palabras: «hay un servicio de cuentas y una base de datos de movimientos». Si pegan algo sensible, no lo repitas y pide que lo borren.

## Lo que recibes adjunto

En este orden. Si chocan, manda el de más arriba:

1. **La constitución** (`constitucion.md`), si la adjuntan: **es la puerta**. El diseño no puede violarla sin una excepción justificada y aprobada.
2. **El requerimiento** (`requerimiento.md`): **obligatorio, y manda sobre el diseño**. Si el diseño necesita cambiar algo del requerimiento, se rebota al paso 1, no se cambia en silencio.
3. **La evidencia** (`evidencia.md`), si existe.

Plantilla: `plantilla.md` de esta skill.

## 0. Puerta de entrada

- Si no adjuntaron el requerimiento, pídelo y espera.
- El requerimiento tiene que estar **aprobado por una persona** (sección Estado, con nombre y fecha). Si dice `borrador` o `revisado`, **detente**: «El diseño empieza cuando el requerimiento está aprobado. ¿Quién lo aprueba?».
- Excepción: la persona pide explícitamente «requerimiento y diseño juntos, una sola aprobación» y la funcionalidad no es grande. Anótalo en el Estado.
- Si hay preguntas abiertas en el requerimiento que bloquean el diseño, **rebota**: no las respondas tú.

## 1. Cómo está armado hoy

Pregunta **una cosa a la vez, máximo 6 preguntas**, solo lo que cambia el diseño. Cada pregunta con tu suposición, para que la persona solo confirme o corrija:

1. Qué tecnologías usa (lenguaje, framework, base de datos). «¿Es una API en Java con Spring y Oracle, o algo distinto?»
2. Qué partes del sistema toca esta funcionalidad (servicios, pantallas, procesos nocturnos).
3. Si **ya existe algo parecido** que se pueda reusar: un límite, una validación, un cálculo.
4. Cómo se manejan hoy los montos y las fechas (tipo, redondeo, zona horaria), si el requerimiento los usa.
5. Quién llama a esto y cómo se controla el permiso.
6. Cómo se prueba hoy (si hay pruebas automáticas y de qué tipo).

Si la persona no sabe, **no lo inventes**: la respuesta queda como suposición `S-n` con `[VERIFICAR EN EL CÓDIGO]`.

## 2. Alternativas

Propón **dos o tres alternativas**, cada una con lo que cuesta, lo que arriesga y qué suposiciones necesita. Reglas:

- **Primero se reusa lo que existe.**
- **Gana la alternativa más simple que cumple.** La complejidad se tiene que ganar el lugar.

Muéstralas en una tabla corta con tu recomendación y **pídele a la persona que elija**. Esa elección es la decisión D-1.

## 3. Redacta

Llena la plantilla. Va en dos niveles: **arriba el resumen para negocio**, que lo puede leer cualquiera, y **abajo el detalle técnico**.

- **Resumen para negocio:** qué piezas del sistema cambian, qué riesgo tiene y qué tiene que decidir o aprobar alguien. Sin jerga técnica.
- **Decisiones** con ID (`D-1`...): qué se decidió, qué alternativas se descartaron y por qué. «Es la mejor práctica» no es un porqué.
- **Modelo de datos y contrato de API:** entradas, salidas y errores, con su código y mensaje. Los montos con su tipo y redondeo, las fechas con su zona horaria.
- **Trazabilidad:** cada `CA-n` del requerimiento con la decisión o componente que lo cumple. Si un CA no tiene cómo cumplirse, es un hueco: rebota.
- **Seguridad por diseño:** las amenazas (quién podría abusar de esto y cómo) con cómo se previene cada una. Las **invariantes** (`INV-1`...): lo que nunca puede romperse, como «el saldo nunca queda negativo» o «el límite se valida antes de mover el dinero». Revisa en especial los permisos, la validación antes de mover dinero, dos operaciones al mismo tiempo y los datos de clientes en logs.
- **Chequeo de la constitución:** si la adjuntaron, cada principio con «cumple» o «no cumple». Si no cumple, va a excepciones con su porqué. Si no la adjuntaron, escribe: «Sin constitución adjunta: chequeo pendiente.»
- **Suposiciones** (`S-n`): todas juntas en su tabla, con cómo se verifica cada una.
- Riesgos y preguntas abiertas. Estado: `borrador`.

## 4. Autochequeo

Antes de entregar, revisa:

- Cada CA tiene cómo cumplirse.
- Cada D-n tiene una alternativa descartada.
- Hay amenazas e invariantes.
- Cada suposición sobre el código está marcada y en la tabla.
- El diseño no agrega ni quita reglas de negocio.

## 5. Entrega

1. El documento **completo** en un solo bloque de markdown, o como archivo descargable, con el nombre `diseno.md`.
2. Debajo, en pocas líneas: las decisiones tomadas, las invariantes, cuántas suposiciones hay que verificar y qué preguntas quedan abiertas.
3. Cierra con:

> **Siguiente:**
> 1. Descargue `diseno.md`.
> 2. Abra un **chat nuevo** y pida «revisa este diseño», adjuntando `diseno.md` y `requerimiento.md` (y la constitución si la tiene).
> 3. Si el revisor dice DEVOLVER, vuelva aquí con sus hallazgos. Máximo dos vueltas. Si el revisor dice que el diseño cambia el requerimiento, eso se corrige en el requerimiento (`sdd-requerimiento`), no aquí.
> 4. Cuando esté listo, una persona lo aprueba con su nombre y la fecha. Recién ahí siguen las tareas (`sdd-tareas`).

**Nunca lo marques como aprobado.**

## Terminado cuando

- [ ] Cada CA del requerimiento tiene cómo cumplirse.
- [ ] Hay al menos una alternativa descartada con su porqué.
- [ ] Hay amenazas e invariantes.
- [ ] Cada suposición sobre el código está en la tabla con `[VERIFICAR EN EL CÓDIGO]`.
- [ ] El resumen para negocio se entiende sin saber programar.
- [ ] El estado no dice aprobado sin firma.
