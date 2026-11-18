# Cómo probar el explorador

En el repositorio de práctica `banco-practica`, en una conversación nueva:

> /sdd:explorar src/heredado/extracto.js, porque queremos mostrar en el extracto la comisión de cada transferencia

## Lo que tiene que encontrar (con archivo y línea)

| # | Hallazgo | Tipo |
|---|---|---|
| 1 ★ | Cargo escondido: un movimiento tipo «C» de más de 50 resta Bs 1,50 extra del saldo, y ese cargo no aparece como línea del extracto | Regla encontrada → pregunta para negocio: ¿es una comisión vigente o un error? |
| 2 ★ | Comparaciones flojas con `==` (`m.t == "D"`, `f == 1`) | Riesgo |
| 3 ★ | El formato 1 (el que usa `guardar`) escribe el saldo sin redondear: pueden salir saldos como 99.89999999 | Riesgo |
| 4 | Un tipo de movimiento desconocido se ignora en silencio (no suma ni resta, no avisa) | Riesgo |
| 5 | `guardar` escribe a disco sin manejar errores y siempre devuelve 1 | Riesgo |
| 6 | No tiene pruebas | Pruebas |
| 7 | Nombres crípticos (`genExt`, `ms`, `f`, `m.t`, `m.v`) y cabecera «NO TOCAR sin avisar a sistemas» | Contexto |

Si no encuentra los tres marcados con ★, el explorador no sirve todavía.

Tiene que **separar hechos de suposiciones** («resta 1,50» es un hecho; «es una comisión de cheque» es una suposición) y **no modificar** ningún archivo (`git status` limpio al terminar).
