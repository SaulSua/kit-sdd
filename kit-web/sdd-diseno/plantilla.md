# Diseño: <nombre de la funcionalidad>

> El CÓMO. Sale del requerimiento aprobado y no lo cambia: si hace falta cambiarlo, se rebota.
> Requerimiento: `requerimiento.md` (aprobado por <nombre> el <fecha>)
> Escrito sin ver el código: lo marcado `[VERIFICAR EN EL CÓDIGO]` se comprueba en el repositorio antes de construir (tarea T-0).

## 0. Resumen para negocio

Para leer sin saber programar.

- **Qué cambia:** <qué piezas del sistema se tocan, en palabras simples>
- **Qué se decidió:** <la decisión principal y por qué, en una frase>
- **Qué riesgo tiene:** <lo que podría salir mal y cómo se cuida>
- **Qué falta decidir o aprobar:** <quién y qué>

## 1. Objetivo

<copiado del requerimiento, una o dos frases>

## 2. Cómo está armado hoy

Lo que contó la persona. Lo que nadie confirmó va como suposición en la sección 9.

- Tecnología:
- Partes que toca:
- Lo que ya existe y se reusa:

## 3. Alternativas y decisiones

| ID | Decisión | Alternativas descartadas | Por qué |
|---|---|---|---|
| D-1 | | | |

## 4. Modelo de datos

Entidades, campos, tipos y restricciones. Qué se agrega o cambia respecto de hoy.

## 5. Contrato de API

Para cada operación: entrada, salida, errores (con su código y mensaje). Montos con tipo y redondeo; fechas con zona horaria.

## 6. Cómo se cumple cada criterio

| Criterio | Se cumple con |
|---|---|
| CA-1 | D-1 · <componente> |

## 7. Seguridad por diseño

**Amenazas:** quién podría abusar de esto y cómo.

| # | Amenaza | Cómo se previene |
|---|---|---|
| 1 | | |

**Invariantes, lo que nunca puede romperse:**

- INV-1:
- INV-2:

## 8. Chequeo de la constitución

| Principio | ¿Cumple? | Cómo |
|---|---|---|
| | sí / no | |

**Excepciones** (solo si algún principio no se cumple; las aprueba una persona):

| Principio | Por qué hace falta | Alternativa más simple descartada y por qué |
|---|---|---|

## 9. Suposiciones a verificar en el código

| ID | Suposición `[VERIFICAR EN EL CÓDIGO]` | Cómo se verifica | Si es falsa, afecta a |
|---|---|---|---|
| S-1 | | | D-1, CA-2 |

## 10. Riesgos

| ID | Riesgo | Qué se hace |
|---|---|---|
| RK-1 | | |

## 11. Preguntas abiertas

- [POR DEFINIR: qué falta · quién lo decide]

## 12. Estado

- Estado: borrador | revisado | aprobado
- Revisado por sdd-revisor: <fecha y veredicto>
- **Aprobado por:** <nombre> · <fecha>
