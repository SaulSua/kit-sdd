---
name: sdd-tareas
description: "Divide un diseño aprobado en una lista ordenada de tareas chicas, en el chat, sin acceso al código. Cada tarea con el criterio de aceptación que cubre, la prueba que se escribe primero y su punto de corte seguro. La primera tarea (T-0) siempre verifica en el repositorio las suposiciones del diseño. Arma el plan de pruebas, cruza que ningún criterio quede sin tarea y entrega tareas.md con el paquete listo para aprobar. Úsalo después de que una persona aprobó el diseño. Paso 3 del kit SDD web."
---

# Paso 3: las tareas, en qué pedazos y en qué orden

Requerimiento (qué), diseño (cómo) y tareas (en qué pedazos y en qué orden) forman **el paquete que guía la construcción**. Cuando una persona lo aprueba, recién ahí se escribe código, con la herramienta que tenga el equipo (ver `implementar.md` del kit).

**No escribas código en este paso.**

**Regla de datos:** no pidas ni aceptes código del banco, datos de clientes ni credenciales. Si pegan algo sensible, no lo repitas y pide que lo borren.

## Lo que recibes adjunto

1. **El requerimiento** (`requerimiento.md`): obligatorio, manda sobre el diseño.
2. **El diseño** (`diseno.md`): obligatorio, manda sobre las tareas.
3. **La constitución**, si la tienen.

Plantilla: `plantilla.md` de esta skill.

## 0. Puerta de entrada

- Si falta el requerimiento o el diseño, pídelo y espera.
- El **diseño** tiene que estar aprobado por una persona (nombre y fecha en su Estado). Si no lo está, detente y dilo.
- Si al dividir aparece algo que el diseño no resuelve (una estructura, un orden, un límite), **rebota al diseño** (`sdd-diseno`). No lo decidas tú dentro de una tarea.

## 1. T-0: verificar las suposiciones, siempre primero

La primera tarea es siempre **T-0 · Verificar las suposiciones del diseño**. Lista cada `S-n` de la sección 9 del diseño, con cómo se verifica. No escribe código: alguien con acceso al repositorio confirma cada una.

- Si todas se confirman, se sigue con T-1.
- Si alguna es falsa, **el diseño vuelve al paso 2** antes de escribir código. Las tareas que dependen de esa suposición quedan en espera.

Si el diseño no tiene suposiciones, T-0 queda igual, con una sola línea: «confirmar que los archivos y módulos nombrados existen».

## 2. Divide

Cada tarea (`T-1`, `T-2`…):

- **Chica:** se termina en una sesión de trabajo y su cambio se lee entero en una revisión (como guía, menos de unas 200 líneas).
- **Con su prueba primero:** qué prueba se escribe antes y tiene que fallar, con los valores del criterio.
- **Atada a criterios:** qué `CA-n` cubre o qué invariante `INV-n` protege.
- **Con dónde se trabaja:** el módulo o la parte del sistema según el diseño. Como no ves el repositorio, los archivos exactos van marcados `[A CONFIRMAR EN T-0]`.
- **Con punto de corte seguro:** al terminarla, todas las pruebas pasan y el cambio se puede subir solo (un commit).
- **Ordenadas por dependencia:** primero lo que otras necesitan. Lo de mayor riesgo, temprano.

## 3. Plan de pruebas

Para cada `CA-n`, qué prueba lo comprueba (unitaria, de integración o de punta a punta) y en qué tarea se escribe. **Todo CA tiene al menos una prueba.** Las invariantes también.

## 4. Chequeo de coherencia

Antes de entregar, cruza los tres documentos y llena la tabla de cobertura de la plantilla:

- Cada `CA-n` tiene al menos una tarea y una prueba. Un CA sin tarea es un hueco: corrígelo.
- Ninguna tarea queda huérfana: si una `T-n` no cubre ningún CA ni INV, sobra o falta un criterio.
- Los mismos datos tienen los mismos valores y nombres en los tres documentos (montos, horarios, mensajes, nombres de campos).
- Las tareas no agregan ni quitan reglas de negocio. Si lo necesitan, **rebota** al requerimiento.
- Ninguna tarea depende de otra que va después.

## 5. Entrega

1. El documento **completo** en un solo bloque de markdown, o como archivo descargable, con el nombre `tareas.md`.
2. Debajo, en pocas líneas: cuántas tareas hay, en qué orden y qué CA cubre cada una. Qué suposiciones verifica T-0 y qué quedó para rebotar.
3. Cierra con:

> **Siguiente:**
> 1. Descargue `tareas.md`.
> 2. Abra un **chat nuevo** y pida «revisa la coherencia de este paquete», adjuntando los tres archivos: `requerimiento.md`, `diseno.md` y `tareas.md`.
> 3. Si el revisor dice DEVOLVER, vuelva al paso que corresponda con sus hallazgos.
> 4. Cuando esté listo, una persona aprueba **el paquete para construir** con su nombre y la fecha en la sección Aprobación.
> 5. Con el paquete aprobado, se construye en el repositorio, una tarea a la vez, empezando por T-0. Vea `implementar.md` del kit.

**No lo marques aprobado tú.**

## Terminado cuando

- [ ] T-0 está primero y lista todas las suposiciones del diseño.
- [ ] Cada tarea tiene su prueba primero, sus CA, dónde se trabaja y su punto de corte.
- [ ] Todo CA del requerimiento tiene al menos una tarea y una prueba.
- [ ] La tabla de cobertura está llena y no quedan huecos.
- [ ] La aprobación queda sin firmar, para una persona.
