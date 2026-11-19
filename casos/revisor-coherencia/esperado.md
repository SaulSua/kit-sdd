# Cómo probar el revisor-coherencia

Desde la carpeta `casos/revisor-coherencia/`, en una conversación nueva:

> Usa el agente sdd:revisor-coherencia sobre docs/specs/001-limite-diario/

El requerimiento y el diseño cierran bien; los errores están en las tareas y el estado. **Veredicto esperado:** DEVOLVER.

| # | Problema | Dónde |
|---|---|---|
| 1 ★ | **CA-5 sin tarea ni prueba** (validaciones de siempre primero) | Tareas y plan |
| 2 ★ | **Contradicción de monto:** la prueba de T-2 dice Bs 5.000,00; el requerimiento y el diseño, Bs 10.000,00 | T-2 |
| 3 ★ | **Tarea huérfana que cambia el alcance:** T-4 (aviso por correo) no cubre ningún CA y el requerimiento dice «No avisa al cliente por correo ni por mensaje» | T-4 |
| 4 ★ | **Estado dice «tareas aprobado» sin nombre ni fecha**, y abre la construcción | `estado.md` |
| 5 | **Orden:** T-2 depende de T-3, que va después | T-2 |
| 6 | **T-5 sin prueba primero**, y CA-4 sin prueba en el plan | T-5, plan |
| 7 | **Invariantes sin prueba:** INV-1 e INV-2 del diseño no están en el plan | Plan de pruebas |
| 8 | **Deriva de términos:** «consumo diario» en las tareas, «acumulado» en requerimiento y diseño | T-2 |
| 9 | Ninguna tarea dice «Hecho cuando» ni punto de corte | Todas |
