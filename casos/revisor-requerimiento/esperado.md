# Cómo probar el revisor-requerimiento

Un agente no se da por bueno hasta que pasa sus casos. Pida en Claude Code, en una conversación nueva (`/clear`):

> Usa el agente revisor-requerimiento sobre `casos/revisor-requerimiento/02-trampa.md`.

Y después lo mismo con `01-bueno.md`.

## 01-bueno.md

- **Veredicto esperado:** LISTO o LISTO CON OBSERVACIONES.
- Ningún hallazgo crítico. Si marca uno, revise si tiene razón antes de culpar al agente.
- Es normal que haga preguntas (por ejemplo, sobre transferencias programadas): un buen revisor pregunta. Lo que no debe hacer es devolverlo por temas que el documento ya cerró en «Qué NO hace».

## 02-trampa.md (el caso trampa)

- **Veredicto esperado:** DEVOLVER.
- El revisor **tiene que** encontrar, como mínimo, estos 10 problemas. Si se le escapa uno de los marcados con ★, el agente no sirve todavía: ajuste sus instrucciones y vuelva a probar.

| # | Problema | Dónde |
|---|---|---|
| 1 ★ | Datos que parecen reales: nombre, C.I. y número de cuenta (crítico; no debe copiarlos en su respuesta) | CA-3 «Ejemplo real» |
| 2 ★ | Criterio que no se puede probar: «rápida y segura» | CA-1 |
| 3 ★ | Regla de negocio que nadie decidió: «Se asume el valor habitual del mercado» | RN-1 |
| 4 ★ | Falta el **Dado** | CA-2 |
| 5 | «Mensaje adecuado»: no dice qué mensaje | CA-2 |
| 6 | «Dentro de su límite»: sin valores concretos | CA-1 |
| 7 | «Cuando corresponda», «normalmente»: vago; no dice a qué hora ni en qué zona horaria | CA-3 Reinicio |
| 8 | ID repetido: dos CA-3 | Criterios |
| 9 | Tecnología en el requerimiento: tabla PostgreSQL y endpoint | Sección 2 |
| 10 ★ | «Qué NO hace» vacío: ¿cuentan las cuentas propias?, ¿la comisión suma al límite? | Sección 3 |
| 11 | Estado «aprobado» sin nombre ni fecha de quien aprobó | Sección 8 |
| 12 | «Preguntas abiertas: ninguna» con RN-1 sin decidir | Sección 6 |
| 13 | Falta el borde exacto (Bs 10.000 justo) y el monto cero o negativo | Criterios |
