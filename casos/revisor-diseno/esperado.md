# Cómo probar el revisor-diseno

Desde la carpeta `casos/revisor-diseno/` (así encuentra `docs/constitucion.md` y el requerimiento), en una conversación nueva:

> Usa el agente sdd:revisor-diseno sobre docs/specs/001-limite-diario/diseno.md

**Veredicto esperado:** DEVOLVER. Tiene que encontrar:

| # | Problema | Dónde |
|---|---|---|
| 1 ★ | **Viola la constitución:** dependencia nueva (`moment-timezone`) sin aprobación ni excepción, y el chequeo dice «cumple todo» | D-2, sección 7 |
| 2 ★ | **Cambia el requerimiento:** suma la comisión al acumulado, y el requerimiento dice que la comisión no cuenta | D-3 |
| 3 ★ | **Criterios sin cubrir:** CA-5 (validaciones de siempre primero) y CA-6 (cambio de día) no aparecen | Sección 5 |
| 4 ★ | **Sin seguridad por diseño:** sin amenazas ni invariantes (por ejemplo, validar el límite antes de mover el dinero; dos transferencias al mismo tiempo) | Sección 6 |
| 5 ★ | **Decisiones sin alternativas:** «es la mejor práctica», «es más fácil» | D-1, D-2 |
| 6 | Montos como decimal sin `redondear`, contra el principio de la constitución | Sección 3 |
| 7 | El mensaje de error no es el del requerimiento (CA-3 pide un texto exacto) | Sección 4 |
| 8 | En memoria: se pierde al reiniciar; no dice qué pasa | D-1, riesgos «ninguno» |
| 9 | «Riesgos: ninguno» y «Preguntas: ninguna» con todo lo anterior | Secciones 8 y 9 |
