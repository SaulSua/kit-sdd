# Implementar: una tarea a la vez, en el repositorio

> Esto **no** se hace en Claude web. Se hace en el repositorio, con la herramienta de código que el equipo tenga aprobada (Claude Code, Copilot, Cursor u otra) o a mano.
> Antes de empezar: el paquete (`requerimiento.md`, `diseno.md`, `tareas.md`) tiene que estar **aprobado por una persona**.

## Antes de la primera tarea

1. Copie los tres documentos al repositorio, en `docs/specs/<NNN-nombre>/`.
2. Cree una rama con el mismo nombre: `git switch -c <NNN-nombre>`.
3. Corra todas las pruebas una vez y anote cuántas pasan. Ese es el punto de partida.

## T-0: verificar las suposiciones

Haga T-0 antes que cualquier otra tarea. Puede pedírselo a la herramienta con este prompt:

```
Lee docs/specs/<NNN-nombre>/diseno.md, sección 9 (Suposiciones), y tareas.md, tarea T-0.
Para cada suposición S-n, busca en el código si es verdadera o falsa.
Devuelve una tabla: S-n | verdadera / falsa / no se pudo saber | archivo:línea que lo muestra.
Después, para cada tarea, dime qué archivos reales reemplazan los [A CONFIRMAR EN T-0].
No modifiques ningún archivo.
```

- Si **todas** son verdaderas: reemplace los `[A CONFIRMAR EN T-0]` de `tareas.md` por las rutas reales y siga con T-1.
- Si **alguna** es falsa: **no escriba código.** El diseño vuelve al paso 2 (`sdd-diseno`) con lo que encontró.

## Cada tarea: el prompt para pegar

Una tarea por vez, en el orden de `tareas.md`. Reemplace `T-n` y la carpeta:

```
Implementa SOLO la tarea T-n de docs/specs/<NNN-nombre>/tareas.md, con TDD.

Lee primero: tareas.md (la tarea: su prueba, sus archivos, sus CA), diseno.md (manda
sobre el código) y requerimiento.md (los criterios con sus valores exactos).
Si existe docs/constitucion.md, también.

El ciclo:
1. ROJO: escribe la prueba que dice la tarea, con los valores del criterio. Córrela.
   Tiene que fallar porque el comportamiento no existe, no por un error de sintaxis
   o de importación. Si pasa sin cambiar nada, detente y avísame.
2. VERDE: escribe el MÍNIMO código para que pase, siguiendo el diseño.
3. TODO: corre todas las pruebas. Todas tienen que pasar. Si rompiste otra prueba,
   arregla tu código, no la prueba.
4. LIMPIEZA: ordena lo que escribiste sin cambiar el comportamiento y vuelve a correr todo.

Límites:
- Solo los archivos que dice la tarea. Si necesitas tocar otro, detente y dime cuál y por qué.
- Nunca cambies una prueba que ya existía para que pase.
- Si el diseño no alcanza (falta una decisión, un nombre, un comportamiento), no lo
  decidas: detente y dime qué falta.
- Máximo tres intentos para llegar al verde.
- No hagas commit. No instales dependencias. No toques configuración, .env ni credenciales.
- Nada de datos reales de clientes en código, pruebas ni mensajes.

Devuélveme:
- La prueba escrita y la salida cuando falló (lo esencial). ¿Falló por la razón correcta?
- Los archivos que cambiaste y qué hace el código, en dos líneas.
- El resultado de todas las pruebas: cuántas pasan y cuántas fallan.
- Si te detuviste: qué falta y quién lo decide.
```

## Después de cada tarea, antes del commit

Revise el cambio usted (o pídale a otra persona) con estas preguntas:

- [ ] ¿Tocó solo los archivos de la tarea?
- [ ] ¿Se cambió alguna prueba que ya existía? Si es así, ¿por qué?
- [ ] ¿La prueba nueva comprueba el criterio con sus valores exactos? Si rompe el código a propósito (por ejemplo, cambia `>` por `>=`), ¿la prueba falla?
- [ ] ¿Hay lógica que no está en el diseño?
- [ ] ¿Hay datos reales, secretos o datos de clientes en logs?
- [ ] ¿Pasan todas las pruebas?

Si todo está bien: un commit con el nombre de la tarea (`T-1: <nombre>`). Marque la tarea como hecha en `tareas.md` con el hash del commit.

## Si algo no cierra

| Pasa esto | Vuelve a |
|---|---|
| Una suposición del diseño era falsa | Paso 2, `sdd-diseno` |
| La tarea necesita una decisión que el diseño no tomó | Paso 2, `sdd-diseno` |
| El criterio está mal o falta una regla de negocio | Paso 1, `sdd-requerimiento` |
| La tarea es demasiado grande | Paso 3, `sdd-tareas`, para dividirla |
