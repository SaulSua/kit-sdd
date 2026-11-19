# Diseño técnico: límite diario de transferencias a otros bancos

> Requerimiento: `requerimiento.md` (aprobado)

## 1. Objetivo

Que las transferencias a otros bancos tengan un tope diario de Bs 10.000,00 por cuenta de origen.

## 2. Alternativas y decisiones

| ID | Decisión | Alternativas descartadas | Por qué |
|---|---|---|---|
| D-1 | Registrar cada transferencia hecha en un historial en memoria (`movimientos.js`) con cuenta, tipo, monto y fecha-hora | Guardar solo un contador por cuenta | El contador no permite auditar ni recalcular; el historial sirve también para el extracto |
| D-2 | Calcular «hoy» con `Intl.DateTimeFormat` en `America/La_Paz` | Librería externa de fechas | La constitución no permite dependencias nuevas; `Intl` viene con Node |
| D-3 | Validar el límite dentro de `transferir`, después de las validaciones existentes y antes de mover saldos | Validar en una función aparte que llame quien quiera | Si es opcional, alguien la va a saltar |

## 3. Modelo de datos

Movimiento: `{ cuenta, tipo, monto, fechaHora }`. `monto` en Bs con dos decimales, siempre por `redondear`.

## 4. Contrato

`transferir(origen, destino, monto, tipo)` igual que hoy. Si supera el límite: `Error("Supera el límite diario de Bs 10.000,00 para transferencias a otros bancos")`.

## 5. Cómo se cumple cada criterio

| Criterio | Se cumple con |
|---|---|
| CA-1, CA-2, CA-3 | D-1 + D-3 |
| CA-4 | D-3 (solo `otro_banco` suma) |
| CA-5 | D-3 (el límite va después de las validaciones de siempre) |
| CA-6 | D-2 |

## 6. Seguridad por diseño

| # | Amenaza | Cómo se previene |
|---|---|---|
| 1 | Partir una transferencia grande en varias chicas | El límite es por acumulado del día, no por operación |
| 2 | Saltarse la validación llamando a otra función | D-3: está dentro de `transferir` |

- INV-1: el acumulado del día de una cuenta nunca supera Bs 10.000,00.
- INV-2: si una transferencia se rechaza, ningún saldo cambia.

## 7. Chequeo de la constitución

| Principio | ¿Cumple? | Cómo |
|---|---|---|
| Sin dependencias nuevas | sí | D-2 usa `Intl` |
| Montos con `redondear` | sí | Modelo de datos |
| Toda regla con prueba | sí | Ver tareas |
| Sin datos de clientes | sí | Solo cuentas de práctica |

## 10. Estado

- Estado: aprobado
- **Aprobado por:** Responsable técnico del equipo · 25-nov-2026
