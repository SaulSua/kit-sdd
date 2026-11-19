# Diseño técnico: límite diario de transferencias a otros bancos

> CASO TRAMPA del revisor-diseno. Tiene errores sembrados a propósito.
> Requerimiento: `requerimiento.md` (aprobado)

## 1. Objetivo

Que las transferencias a otros bancos tengan un tope diario por cuenta de origen.

## 2. Alternativas y decisiones

| ID | Decisión | Alternativas descartadas | Por qué |
|---|---|---|---|
| D-1 | Guardar el acumulado del día en un objeto en memoria por cuenta | | Es la mejor práctica |
| D-2 | Usar la librería `moment-timezone` para calcular el inicio del día en La Paz | | Es más fácil |
| D-3 | El acumulado suma el monto **más la comisión**, para ser más conservadores | | Protege mejor al cliente |

## 3. Modelo de datos

`acumulados[numeroCuenta] = { fecha: "AAAA-MM-DD", total: number }`. El total se guarda como número decimal tal cual se suma.

## 4. Contrato de API

`transferir(origen, destino, monto, tipo)` igual que hoy. Si supera el límite, lanza `Error("Límite superado")`.

## 5. Cómo se cumple cada criterio

| Criterio | Se cumple con |
|---|---|
| CA-1 | D-1 |
| CA-2 | D-1 |
| CA-3 | D-1 |
| CA-4 | D-1 (solo se suma si el tipo es otro_banco) |

## 6. Seguridad por diseño

Pendiente.

## 7. Chequeo de la constitución

Cumple todo.

## 8. Riesgos

Ninguno.

## 9. Preguntas abiertas

Ninguna.

## 10. Estado

- Estado: revisado
- **Aprobado por:**
