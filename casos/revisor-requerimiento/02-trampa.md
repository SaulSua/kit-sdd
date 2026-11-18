# Requerimiento: límite diario de transferencias

## 1. Para quién y para qué

Como cliente, quiero un límite en mis transferencias, para estar más seguro.

## 2. Qué hace

El sistema controla las transferencias del día y no deja pasar las que superan el límite. Se guarda el acumulado en una tabla `limites_diarios` de PostgreSQL y se consulta por el endpoint `GET /api/v1/limites`.

## 3. Qué NO hace

-

## 4. Reglas de negocio

| ID | Regla | Valor | Quién la decidió |
|---|---|---|---|
| RN-1 | Límite diario por cliente | Bs 10.000 | Se asume el valor habitual del mercado |

## 5. Criterios de aceptación

**CA-1 · Transferencia dentro del límite**
- **Dado** un cliente con saldo suficiente
- **Cuando** transfiere dentro de su límite
- **Entonces** la transferencia se procesa de forma rápida y segura

**CA-2 · Transferencia que supera el límite**
- **Cuando** supera el límite
- **Entonces** el sistema muestra un mensaje adecuado

**CA-3 · Ejemplo real**
- **Dado** el cliente Juan Pérez Rojas, C.I. 4567123 SC, cuenta 3001245678
- **Cuando** transfiere Bs 12.000
- **Entonces** se rechaza

**CA-3 · Reinicio**
- **Dado** que pasó el día
- **Cuando** corresponda
- **Entonces** el límite se reinicia normalmente

## 6. Preguntas abiertas

Ninguna.

## 8. Estado

- Estado: aprobado
