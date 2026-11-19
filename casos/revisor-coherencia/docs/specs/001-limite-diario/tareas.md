# Tareas: límite diario de transferencias a otros bancos

> CASO TRAMPA del revisor-coherencia. Tiene errores sembrados a propósito.

## Tareas

### T-1 · Historial de movimientos

- **Cubre:** CA-1
- **Prueba primero:** `test/movimientos.test.js › registra una transferencia hecha`
- **Archivos:** `src/movimientos.js`
- **Depende de:** —

### T-2 · Validar el consumo diario en transferir

- **Cubre:** CA-2, CA-3
- **Prueba primero:** `test/transferencias.test.js › rechaza si el consumo diario pasa de Bs 5.000,00`
- **Archivos:** `src/transferencias.js`
- **Depende de:** T-3

### T-3 · Calcular el día en hora de Bolivia

- **Cubre:** CA-6
- **Prueba primero:** `test/fechas.test.js › las 00:00 de La Paz son un día nuevo`
- **Archivos:** `src/fechas.js`
- **Depende de:** —

### T-4 · Avisar al cliente por correo cuando llega al 80 % del límite

- **Cubre:** —
- **Prueba primero:** `test/avisos.test.js › manda un correo al 80 %`
- **Archivos:** `src/avisos.js`
- **Depende de:** T-2

### T-5 · Las transferencias dentro del banco no suman

- **Cubre:** CA-4
- **Archivos:** `src/transferencias.js`
- **Depende de:** T-2

## Plan de pruebas

| Criterio | Prueba | Tarea |
|---|---|---|
| CA-1 | registra una transferencia hecha | T-1 |
| CA-2, CA-3 | rechaza si el consumo diario pasa de Bs 5.000,00 | T-2 |
| CA-4 | | T-5 |
| CA-6 | las 00:00 de La Paz son un día nuevo | T-3 |

## Aprobación

- **Paquete aprobado para construir por:**
