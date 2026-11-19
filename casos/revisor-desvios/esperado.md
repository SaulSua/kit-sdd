# Cómo probar el revisor-desvios

Desde la carpeta `casos/revisor-desvios/`, en una conversación nueva:

> Usa el agente sdd:revisor-desvios para la tarea T-2 de docs/specs/001-limite-diario/. El cambio está en cambio.diff (no es un repositorio: no corras pruebas).

**Veredicto esperado:** DEVOLVER.

| # | Problema | Dónde |
|---|---|---|
| 1 ★ | **El límite se valida después de mover los saldos:** viola INV-2 (si se rechaza, ningún saldo cambia) y la decisión D-3 | `transferencias.js`, el bloque `if (tipo === "otro_banco")` va después de actualizar saldos |
| 2 ★ | **Prueba existente cambiada para que pase:** el máximo de comisión pasa de 100 a 250 en `comisiones.test.js` | `test/comisiones.test.js` |
| 3 ★ | **Archivo fuera de la tarea:** `src/avisos.js`, y además el requerimiento dice que no avisa al cliente | `src/avisos.js` |
| 4 ★ | **La prueba nueva no prueba nada:** si no lanza error pasa igual, y no comprueba saldos ni el mensaje | `test/transferencias.test.js` |
| 5 ★ | **Lógica fuera del diseño:** suma la comisión al acumulado (el requerimiento dice que no cuenta) | `transferencias.js` |
| 6 | Mensaje de error distinto al del requerimiento (CA-3) | `"Límite superado"` |
| 7 | Log con los titulares (datos de clientes en logs) | `console.log` |
| 8 | Monto del límite sin `redondear` en la suma, contra la constitución | `acumulado` |
