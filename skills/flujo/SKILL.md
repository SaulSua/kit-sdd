---
name: flujo
description: "El flujo completo del kit SDD encadenado. Lee el estado de una funcionalidad (docs/specs/<NNN>/estado.md y sus documentos), dice en qué paso está, qué falta para abrir el siguiente y lo ejecuta con el skill que corresponde, respetando el tamaño (chico, normal, grande), las puertas de aprobación y los rebotes. Úsalo para retomar cualquier funcionalidad sin recordar en qué iba, o para ver el estado de todas."
argument-hint: "[carpeta de la funcionalidad, un pedido nuevo, o vacío para ver todas]"
---

# El flujo completo

Una funcionalidad pasa siempre por los mismos pasos. Este skill **no hace el trabajo de cada paso**: lee dónde está, dice qué falta y llama al skill que corresponde. Nunca salta una puerta.

## Los caminos

| Tamaño | Pasos |
|---|---|
| **Chico** | entrada → requerimiento corto → implementar → (pruebas si hace falta) |
| **Normal** | entrada → explorar → requerimiento → diseño (puede aprobarse junto con el requerimiento) → tareas → implementar → pruebas → seguridad |
| **Grande** | igual que normal, pero **requerimiento aprobado antes de diseñar** (dos aprobaciones) |
| **Incidente** | mitigar primero (fuera del kit); después, entrada como bug |

Si toca dinero o datos de clientes, nunca es chico.

## Lee primero

1. `docs/constitucion.md` y `docs/kit/reglas.md`.
2. `docs/specs/`: las carpetas de funcionalidades. En la que te pidieron: `estado.md` y los documentos que existan.

## 1. ¿Qué funcionalidad?

- **Vacío:** lista todas las de `docs/specs/` con su paso actual, quién tiene que aprobar qué y qué está trabado, en una tabla corta. Termina ahí.
- **Un pedido nuevo** (no existe carpeta): empieza por `/sdd:entrada`.
- **Una carpeta:** sigue.

## 2. ¿Dónde está?

Lee `estado.md` y **compruébalo contra los documentos** (el estado puede estar desactualizado: mandan los documentos). Para cada paso del camino de su tamaño, mira:

- ¿existe el documento?
- ¿lo revisó su agente? (veredicto anotado)
- ¿lo aprobó una persona? (nombre y fecha)

## 3. ¿Qué abre el siguiente paso?

Muéstralo así: «Está en **diseño, revisado**. Para pasar a **tareas** falta: **la aprobación de una persona**». Y pregunta: «¿Quién lo aprueba?» o «¿Sigo con <skill>?».

- **Puertas:** diseño necesita requerimiento aprobado (salvo normal con aprobación conjunta); tareas necesita diseño aprobado; implementar necesita el paquete aprobado. **No las saltes aunque la persona tenga apuro:** di qué falta.
- **Rebotes:** si en `estado.md` hay pendientes que vuelven a un paso anterior, ese paso va primero.
- Si la persona confirma, ejecuta el skill del paso: `/sdd:entrada`, `/sdd:explorar`, `/sdd:requerimiento`, `/sdd:diseno`, `/sdd:tareas`, `/sdd:implementar`, `/sdd:pruebas`, `/sdd:seguridad`.

## 4. Al cerrar un paso

Actualiza `estado.md`. Si en el paso algo salió mal con un agente (se equivocó, hubo que corregirlo dos veces), sugiere `/sdd:leccion`.

## Terminado cuando

- [ ] La persona sabe en qué paso está la funcionalidad y qué falta para el siguiente.
- [ ] Ninguna puerta se saltó.
- [ ] `estado.md` coincide con los documentos.
