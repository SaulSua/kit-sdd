---
name: tareas
description: "Divide un diseño técnico aprobado en tareas chicas y construibles, cada una con su prueba que falla primero, su criterio de aceptación y su punto de corte seguro; arma el plan de pruebas desde los criterios; hace revisar la coherencia entre requerimiento, diseño y tareas con el agente revisor-coherencia, y deja todo listo para la aprobación de una persona. Deja docs/specs/<NNN>/tareas.md y estado.md. Úsalo después de que una persona aprobó el diseño."
argument-hint: "[carpeta o nombre de la funcionalidad]"
---

# Tareas y aprobación: el documento que guía la construcción

Requerimiento (qué), diseño (cómo) y tareas (en qué pedazos y en qué orden) forman **el paquete que guía la construcción**. Cuando una persona lo aprueba, recién ahí se escribe código.

**No escribas código en este skill.**

## Lee primero

1. `docs/constitucion.md`.
2. `docs/specs/<NNN>/requerimiento.md` (manda sobre el diseño) y `diseno.md` (manda sobre las tareas).
3. `docs/kit/reglas.md`, `.claude/rules/` del área, `docs/kit/politica-datos.md`.

Plantillas: `docs/kit/plantillas/tareas.md` y `docs/kit/plantillas/estado.md` si existen; si no, `plantilla.md` y `estado.md` de esta carpeta.

## 0. Puerta de entrada

- El **diseño** tiene que estar aprobado por una persona (nombre y fecha en su Estado). Si no: detente y dilo.
- Si al dividir aparece algo que el diseño no resuelve (una estructura, un orden, un límite), **rebota al diseño**. No lo decidas tú dentro de una tarea.

## 1. Divide

Cada tarea (`T-1`, `T-2`…):

- **Chica:** se termina en una sesión de trabajo y su cambio se lee entero en una revisión (como guía, menos de unas 200 líneas).
- **Con su prueba primero:** qué prueba se escribe antes y tiene que fallar.
- **Atada a criterios:** qué `CA-n` cubre (o qué invariante `INV-n` protege).
- **Con sus archivos:** cuáles toca. Si no los sabes, el diseño no está terminado.
- **Con punto de corte seguro:** al terminarla, todas las pruebas pasan y el cambio se puede subir solo (un commit).
- **Ordenadas por dependencia:** primero lo que otras necesitan. Lo de mayor riesgo, temprano.

## 2. Plan de pruebas

Desde los criterios de aceptación: para cada `CA-n`, qué prueba lo comprueba (unitaria, de integración o de punta a punta) y en qué tarea se escribe. **Todo CA tiene al menos una prueba.** Las invariantes del diseño también.

## 3. Revisión de coherencia

Lanza el agente **revisor-coherencia** (`sdd:revisor-coherencia`) con la ruta de la carpeta. Cruza requerimiento, diseño y tareas: criterios sin tarea, tareas sin criterio, contradicciones, términos que cambian de nombre, violaciones de la constitución. Corrige lo que sea de las tareas; lo que sea del diseño o del requerimiento, **rebota** a ese paso.

## 4. Estado y aprobación

1. Crea o actualiza `docs/specs/<NNN>/estado.md` con la plantilla: en qué paso va la funcionalidad, qué está aprobado, por quién y cuándo, y qué abre el paso siguiente.
2. Pide la aprobación: «El paquete (requerimiento, diseño y tareas) está revisado. ¿Lo aprueba para construir?». Si la persona aprueba, anota nombre y fecha en `tareas.md` y en `estado.md`. **No lo marques aprobado tú.**

## 5. Entrega

Cuántas tareas, en qué orden, qué CA cubre cada una, qué quedó para rebotar. Siguiente paso: `/sdd:implementar`, tarea por tarea.

## Terminado cuando

- [ ] Cada tarea tiene prueba primero, CA, archivos y punto de corte.
- [ ] Todo CA del requerimiento tiene al menos una tarea y una prueba.
- [ ] El revisor de coherencia corrió y no quedan críticos.
- [ ] `estado.md` dice en qué paso va y quién aprobó qué.
