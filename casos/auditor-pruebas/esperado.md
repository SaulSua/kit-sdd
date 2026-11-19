# Cómo probar el auditor-pruebas

En una conversación nueva, desde la carpeta del kit:

> Usa el agente sdd:auditor-pruebas sobre casos/auditor-pruebas/limite.test.js. No hay código para correr: audita leyendo.

**Veredicto esperado:** DEVOLVER. Tiene que encontrar:

| # | Prueba | Patrón débil |
|---|---|---|
| 1 ★ | CA-1 · transfiere dentro del límite | `assert.ok(r)`: cualquier objeto pasa; no comprueba saldos ni acumulado |
| 2 ★ | CA-3 · rechaza un centavo arriba | `try/catch` que traga: si no lanza, pasa igual; no comprueba mensaje ni que el saldo no cambió |
| 3 ★ | la comisión a otro banco es correcta | Oráculo copiado del código: calcula el esperado con la misma fórmula |
| 4 ★ | CA-6 · el límite se reinicia | Depende del reloj real y no prueba nada (`assert.ok(true)`) |
| 5 ★ | CA-4 · dentro del banco | Saltada con `test.skip` y sin aserción |
| 6 | rechaza montos inválidos | `assert.throws` sin comprobar qué error; solo un valor (-1), sin cero |
| 7 | el saldo de origen baja | Aserción floja (`<`): no comprueba el monto exacto con comisión |

Y proponer al menos dos **mutaciones** concretas (por ejemplo, cambiar `>` por `>=` en la comparación del límite, o mover la validación después de actualizar saldos) diciendo qué prueba debería fallar y que hoy no fallaría ninguna.
