---
name: pruebas
description: "Arma y completa la suite de pruebas de una funcionalidad desde sus criterios de aceptación e invariantes - una prueba por criterio como mínimo, con sus bordes, errores y datos sintéticos, cada una nombrada con el criterio que prueba - y la hace auditar por el agente auditor-pruebas para encontrar pruebas débiles. Úsalo para QA de una funcionalidad, para cubrir código heredado antes de cambiarlo, o cuando una suite pasa pero no inspira confianza."
argument-hint: "[carpeta de la funcionalidad o archivos a cubrir]"
---

# QA con IA: probar con criterio

Una prueba vale por lo que **haría fallar**. Este skill arma pruebas desde los criterios (no desde el código) y después busca las que no prueban nada.

## Lee primero

1. `docs/constitucion.md`, `docs/kit/reglas.md`, `.claude/rules/` del área de pruebas, `docs/kit/politica-datos.md`.
2. Si es una funcionalidad: `requerimiento.md` (criterios `CA-n` y reglas `RN-n`), `diseno.md` (invariantes `INV-n`), `tareas.md` (plan de pruebas).
3. Las pruebas que ya existen y cómo se corren (`CLAUDE.md`).

## 1. Mapa de cobertura

Arma una tabla: cada `CA-n` e `INV-n` con las pruebas que lo cubren hoy. Lo que no tiene prueba es lo primero.

**Código heredado sin requerimiento:** las pruebas son de **caracterización**: fijan lo que el código hace hoy (aunque parezca un error), para poder cambiarlo sin romper nada sin darse cuenta. Cada comportamiento raro que fijes va como pregunta para negocio, no se «corrige» en la prueba.

## 2. Escribe las que faltan

Por cada criterio sin prueba, o con prueba débil:

- **El caso del criterio**, con sus valores exactos.
- **Los bordes:** justo en el límite, un centavo arriba y abajo, cero, negativo, vacío, repetido, cambio de día y zona horaria.
- **Los errores:** el mensaje exacto y que **el estado no cambie** (saldos, registros).
- **Datos sintéticos:** inventados y evidentes. Nunca copiados de producción.
- **Nombre = comportamiento + criterio:** `"CA-3 · rechaza un centavo arriba del límite y no mueve saldos"`.
- El tipo justo: unitaria por defecto; integración cuando el criterio cruza módulos; punta a punta (Playwright u otro) solo para el recorrido de la persona.

Corre la suite. Las pruebas nuevas sobre código ya construido deberían pasar; **si una falla, encontraste un bug**: no cambies el código aquí, anótalo y sugiere `/sdd:entrada` o `/sdd:depurar`.

## 3. Auditoría

Lanza el agente **auditor-pruebas** (`sdd:auditor-pruebas`) sobre los archivos de prueba de la funcionalidad. Busca pruebas que pasarían con el código roto. Corrige las débiles que escribiste tú; las que ya existían, muéstraselas a la persona.

Si la persona lo autoriza, haz la **prueba de mutación** que propone el auditor: cambia una línea del código a propósito (un `>` por `>=`, un número), corre las pruebas, y **vuelve el código a como estaba** (`git checkout -- <archivo>`). Si ninguna prueba falla con el código roto, falta una prueba.

## 4. Entrega

- Tabla de cobertura final: criterio → pruebas.
- Pruebas nuevas, bugs encontrados, pruebas débiles que quedaron.
- `git status`: solo cambiaron archivos de prueba.

## Terminado cuando

- [ ] Cada `CA-n` e `INV-n` tiene al menos una prueba con sus bordes.
- [ ] El auditor corrió y las débiles nuevas se corrigieron.
- [ ] No se cambió código de producción (los bugs quedaron anotados).
