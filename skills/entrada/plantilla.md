# Entrada: <nombre corto>

> El paso 0: qué llegó, qué tipo de trabajo es y qué camino sigue. Sin datos reales de clientes.
> Fecha: <fecha> · Quién lo pidió o reportó: <rol, no nombre de cliente>

## El pedido

<una o dos frases, tal como llegó, sin datos de clientes>

## Tipo

- Tipo: funcionalidad | cambio | bug | incidente | deuda técnica | regulatorio
- Por qué: <una frase. Si llegó como bug pero lo esperado no está escrito en ningún lado, decirlo>

## Evidencia

- **Bug:** prueba que falla: `<archivo de prueba> › <nombre de la prueba>`
  - Salida al correrla: <lo esencial del error>
  - Falla por la razón correcta: sí | no
  - Si no se pudo reproducir: qué se probó y qué datos faltan
- **Otro tipo:** qué se sabe hoy y qué partes del sistema parece tocar.

## Qué toca

- [ ] Movimiento de dinero
- [ ] Datos de clientes
- [ ] Varias partes del sistema
- [ ] Código heredado sin pruebas
- [ ] Integración con otro sistema
- [ ] Seguridad o permisos

## Tamaño

- Propuesto: chico | normal | grande
- Por qué:
- **Confirmado por:** <nombre> · <fecha>

## Camino

1. <siguiente comando, por ejemplo /sdd:explorar>
2.

## Preguntas abiertas

- [POR DEFINIR: qué falta · quién lo decide]
