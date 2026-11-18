# Requerimiento: límite diario de transferencias a otros bancos

> Ejemplo inventado para el taller. No es una regla de ningún banco real.

## 1. Para quién y para qué

Como titular de una cuenta, quiero que mis transferencias a otros bancos tengan un tope diario, para que si alguien entra a mi cuenta no pueda vaciarla en un solo día.

## 2. Qué hace

1. Antes de hacer una transferencia a otro banco, se suma lo que la cuenta ya transfirió a otros bancos ese día.
2. Si con la nueva transferencia el total del día pasa el límite, la transferencia se rechaza y el saldo no cambia.
3. Si no lo pasa, la transferencia se hace como hoy.

«Otro banco» quiere decir una cuenta destino de otra entidad financiera, sea del mismo titular o de otro. El límite se mide por cuenta de origen, no por titular.

## 3. Qué NO hace

- No limita las transferencias dentro del mismo banco (propias ni a terceros).
- No suma las cuentas de un mismo titular: cada cuenta tiene su propio límite.
- No cambia las validaciones que ya existen (monto inválido, saldo insuficiente, cuenta inexistente): se aplican antes que el límite, como hoy.
- No permite cambiar el límite por cliente (todos tienen el mismo).
- La comisión no cuenta para el límite: se mide solo el monto transferido.
- No avisa al cliente por correo ni por mensaje.

## 4. Reglas de negocio

| ID | Regla | Valor | Quién la decidió |
|---|---|---|---|
| RN-1 | Límite diario de transferencias a otros bancos, por cuenta de origen | Bs 10.000,00 | Responsable de producto del equipo, 18-nov |
| RN-2 | El día va de 00:00:00 a 23:59:59, hora de Bolivia (America/La_Paz) | | Responsable de producto del equipo, 18-nov |
| RN-3 | Solo suman al acumulado las transferencias que se hicieron; una rechazada por cualquier motivo no suma | | Responsable de producto del equipo, 18-nov |

## 5. Criterios de aceptación

**CA-1 · Dentro del límite** (RN-1)
- **Dado** la cuenta 1001 con saldo Bs 12.500,00 y Bs 0 transferidos hoy a otros bancos
- **Cuando** transfiere Bs 4.000,00 a otro banco
- **Entonces** la transferencia se hace y el acumulado del día queda en Bs 4.000,00

**CA-2 · Exactamente en el límite** (RN-1)
- **Dado** la cuenta 1001 con Bs 6.000,00 transferidos hoy a otros bancos y saldo suficiente
- **Cuando** transfiere Bs 4.000,00 a otro banco
- **Entonces** la transferencia se hace y el acumulado queda en Bs 10.000,00

**CA-3 · Un centavo arriba del límite** (RN-1, RN-3)
- **Dado** la cuenta 1001 con Bs 10.000,00 transferidos hoy a otros bancos y saldo suficiente
- **Cuando** intenta transferir Bs 0,01 a otro banco
- **Entonces** se rechaza con el mensaje «Supera el límite diario de Bs 10.000,00 para transferencias a otros bancos», el saldo no cambia y el acumulado sigue en Bs 10.000,00

**CA-4 · Las transferencias dentro del banco no cuentan** (alcance)
- **Dado** la cuenta 1001 con Bs 10.000,00 transferidos hoy a otros bancos y saldo suficiente
- **Cuando** transfiere Bs 500,00 a otra cuenta del mismo banco
- **Entonces** la transferencia se hace y el acumulado a otros bancos sigue en Bs 10.000,00

**CA-5 · Primero las validaciones de siempre** (alcance)
- **Dado** la cuenta 1003 con saldo Bs 0,00 y Bs 0 transferidos hoy a otros bancos
- **Cuando** intenta transferir Bs 100,00 a otro banco
- **Entonces** se rechaza con el mensaje de saldo insuficiente de hoy, y el acumulado sigue en Bs 0,00

**CA-6 · Cambio de día** (RN-2)
- **Dado** la cuenta 1001 con Bs 10.000,00 transferidos a otros bancos el 18-nov a las 23:59:59, hora de Bolivia
- **Cuando** transfiere Bs 100,00 a otro banco el 19-nov a las 00:00:00, hora de Bolivia
- **Entonces** la transferencia se hace y el acumulado del 19-nov queda en Bs 100,00

## 6. Preguntas abiertas

- Ninguna que bloquee los criterios.

## 7. Evidencia

No aplica: el cambio no toca código heredado.

## 8. Estado

- Estado: borrador
- Revisado por el agente: pendiente
- **Aprobado por:** <nombre> · <fecha>
