---
name: implementar
description: "Construye una funcionalidad tarea por tarea desde sus tareas aprobadas, con TDD dentro de SDD. Por cada tarea lanza al agente implementador (prueba que falla primero, código mínimo, todas las pruebas en verde), después al revisor-desvios contra el diseño, muestra el cambio a la persona y hace un commit chico. Al final prepara el pull request. Úsalo cuando el paquete (requerimiento, diseño y tareas) está aprobado."
argument-hint: "[carpeta de la funcionalidad] [T-n opcional]"
---

# Implementar: TDD dentro de SDD

El código sale de la especificación, **una tarea por vez**. Cada tarea: prueba que falla → código mínimo → todo en verde → revisión → commit. Quien construye no aprueba.

## Lee primero

1. `docs/constitucion.md`, `docs/kit/reglas.md`, `.claude/rules/` del área, `docs/kit/politica-datos.md`.
2. `docs/specs/<NNN>/estado.md` y `tareas.md`.
3. `requerimiento.md` y `diseno.md`: el diseño manda sobre el código; el requerimiento manda sobre el diseño.

## 0. Puerta de entrada

- `tareas.md` tiene «Paquete aprobado para construir por» con nombre y fecha. Si no, **detente**.
- Trabaja en una rama de la funcionalidad (`git switch -c <NNN-nombre>` si no existe). Nunca directo en la rama principal.
- `git status` limpio antes de empezar. Si hay cambios ajenos, pregunta qué hacer.

## 1. Por cada tarea, en orden

Si `$ARGUMENTS` nombra una tarea, solo esa. Si no, la primera pendiente cuyas dependencias estén hechas.

1. **Implementar.** Lanza el agente **implementador** (`sdd:implementador`) con: la ruta de la carpeta, el ID de la tarea, y nada más. El agente lee los documentos, escribe la prueba primero, comprueba que falla por la razón correcta, escribe el código mínimo y corre todas las pruebas.
2. **Revisar.** Lanza el agente **revisor-desvios** (`sdd:revisor-desvios`) con la ruta de la carpeta y el ID de la tarea. Revisa el cambio sin commitear (`git diff`) contra la tarea, el diseño y las reglas.
3. **Decidir con la persona.** Muéstrale: el resumen del implementador (prueba escrita, salida de las pruebas), el veredicto del revisor y `git diff --stat`. Pregunta: «¿Lo acepto y hago el commit?».
   - Si el revisor dice DEVOLVER: vuelve al paso 1 con los hallazgos, **una vez**. Si sigue, detente y muéstraselo a la persona.
   - Si el implementador o el revisor dicen que **el diseño no alcanza** (falta una decisión), **rebota al diseño**. No se arregla en el código.
4. **Commit chico**, solo con los archivos de la tarea: `git add <archivos>` y `git commit -m "T-n: <qué hace> (CA-x)"`. Marca la tarea como hecha en `tareas.md` con el hash, y actualiza `estado.md`.

## 2. Límites para no dar vueltas

- **Máximo tres intentos** del implementador por tarea. Si no logra el verde, se detiene y explica qué falta.
- **Nunca** se cambia una prueba para que pase. Si una prueba está mal, es una decisión de la persona.
- **Nunca** se toca un archivo fuera de la tarea sin preguntar.
- Si algo falla de forma rara (red, permisos, entorno), se detiene y lo dice; no se reintenta a ciegas.

## 3. Al terminar todas las tareas

1. Corre la suite completa una vez más.
2. Prepara el pull request: título con el nombre de la funcionalidad; cuerpo con qué hace, la lista de tareas con sus CA, cómo se probó (salida de las pruebas) y los enlaces a `requerimiento.md`, `diseno.md` y `tareas.md`. **Muéstraselo a la persona antes de crearlo** (`gh pr create` o la herramienta del banco).
3. El PR lo revisa otra persona u otro equipo.

## Terminado cuando

- [ ] Cada tarea tiene su commit con la prueba que primero falló.
- [ ] Todas las pruebas pasan.
- [ ] El revisor de desvíos corrió en cada tarea.
- [ ] `tareas.md` y `estado.md` están al día.
- [ ] El PR está preparado y la persona lo vio.
