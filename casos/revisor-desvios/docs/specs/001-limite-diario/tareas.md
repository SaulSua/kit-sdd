# Tareas: límite diario de transferencias a otros bancos

## Tareas

### T-1 · Historial de movimientos

- **Cubre:** CA-1
- **Prueba primero:** `test/movimientos.test.js › registra una transferencia hecha`
- **Archivos:** `src/movimientos.js`
- **Estado:** hecha

### T-2 · Validar el acumulado del día en transferir

- **Cubre:** CA-2, CA-3, CA-5, INV-1, INV-2
- **Prueba primero:** `test/transferencias.test.js › rechaza un centavo arriba del límite y no mueve saldos`
- **Archivos:** `src/transferencias.js`, `test/transferencias.test.js`
- **Hecho cuando:** la prueba pasa, todas las demás siguen pasando, un commit.
- **Estado:** en curso

## Aprobación

- **Paquete aprobado para construir por:** Responsable técnico del equipo · 28-nov-2026
