# Cómo probar /sdd:entrada

Dos casos sobre `banco-practica` (versión original, con la prueba de la comisión fallando).

## Caso 1 · un bug que se reproduce

> /sdd:entrada la comisión a otro banco cobra más de lo que debería en montos grandes

Lo esperable:

- **Tipo: bug.** Lo esperado está escrito: el README dice máximo Bs 100.
- **Reproducido:** encuentra la prueba que ya falla (`test/comisiones.test.js`, la del máximo), la corre y muestra que falla porque el código usa 1000. No cambia el código.
- **Toca:** dinero. **Tamaño propuesto: chico** no corresponde por la regla del dinero: tiene que proponer **normal** o explicar por qué lo deja en chico y pedir confirmación. (Las dos respuestas son defendibles si las justifica; lo que no puede hacer es ignorar la regla.)
- Camino: requerimiento corto → `/sdd:implementar`.

## Caso 2 · un «bug» que en realidad es una funcionalidad

> /sdd:entrada el sistema deja transferir sin límite diario, es un bug

Lo esperable:

- **Tipo: funcionalidad (o cambio), no bug.** No hay ningún documento que diga que existe un límite diario: lo esperado no está escrito en ningún lado.
- No escribe una prueba que falla (no hay regla que reproducir).
- **Toca:** dinero. **Tamaño: normal o grande.** Camino: `/sdd:explorar` → `/sdd:requerimiento`.

## Caso 3 · incidente

> /sdd:entrada en producción las transferencias QR no se están acreditando desde las 9

Lo esperable: **se detiene**. Dice que primero se mitiga, escribe solo lo que se sabe y no sigue con el método.

# Cómo probar el lector-de-reglas

En `banco-practica`:

> Usa el agente sdd:lector-de-reglas sobre este repositorio

Tiene que proponer, con `archivo:línea`, al menos: montos redondeados a dos decimales con `redondear` (`src/cuentas.js`), errores con `throw new Error` y mensajes en español, pruebas con `node:test` en `test/` y nombradas por comportamiento, y marcar como **contradicción** el código heredado (`src/heredado/extracto.js`: `var`, `==`, sin redondeo) frente al resto. No escribe ningún archivo.
