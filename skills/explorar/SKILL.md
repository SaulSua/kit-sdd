---
name: explorar
description: Explora el código que toca una funcionalidad (sobre todo código heredado) con el agente explorador y deja la evidencia escrita en docs/specs/<NNN-funcionalidad>/evidencia.md, con las reglas escondidas, los riesgos y las preguntas para negocio. Úsalo antes de escribir un requerimiento que cambia código existente. No modifica código.
argument-hint: "[funcionalidad o archivo a explorar]"
---

# Explorar antes de pedir

Antes de pedir un cambio, hay que saber qué hace hoy el código. Este skill manda al agente **explorador** a leer el código y deja lo que encontró por escrito, para que la entrevista del requerimiento parta de hechos.

**No modifiques código en este skill.**

## Lee primero

1. `docs/constitucion.md`: los principios que no se negocian.
2. `docs/kit/reglas.md`: las reglas del equipo para el kit (por ejemplo, carpetas que no se tocan).

Plantilla: `docs/kit/plantillas/evidencia.md` si existe; si no, `plantilla.md` de la carpeta de este skill.

## 1. Qué explorar

1. Si el pedido (`$ARGUMENTS`) dice qué explorar, úsalo. Si no, pregunta en una frase: «¿Qué funcionalidad quiere cambiar, o qué archivo quiere entender?».
2. Pregunta también, si no vino: «¿Para qué cambio futuro?». Es el objetivo de la exploración y va arriba en la evidencia.
3. Busca en `docs/specs/` una carpeta que ya sea de esta funcionalidad. **Si existe, usa esa.** Si no, créala con el número siguiente y un nombre corto: `docs/specs/001-comision-en-extracto/`.

## 2. Lanza al explorador

Lanza el agente **explorador** (en el plugin se llama `sdd:explorador`). Pásale:

- qué funcionalidad o archivos explorar;
- para qué cambio futuro (una frase);
- que devuelva las secciones de su formato.

Si el código es grande y hay partes independientes, puedes lanzar dos o tres exploradores en paralelo, cada uno con una parte.

## 3. Escribe la evidencia

Escribe `docs/specs/<NNN-funcionalidad>/evidencia.md` con lo que devolvió el explorador. Antes de guardar:

- **Comprueba tú dos o tres afirmaciones** abriendo el archivo y la línea que citó. Si una no se sostiene, corrígela o sácala.
- **Ningún dato real** de clientes, credenciales ni secretos en el archivo.
- Las «reglas encontradas» quedan como preguntas: tú no decides si son regla o error.

## 4. Entrega

Reporta en pocas líneas y en lenguaje simple:

- qué hace el código, en dos frases;
- las **preguntas para negocio** (son lo más valioso: alguien tiene que decidirlas);
- los riesgos más serios.

Siguiente paso: `/sdd:requerimiento`, que usa esta evidencia en la entrevista.

## Terminado cuando

- [ ] `evidencia.md` existe en la carpeta de la funcionalidad, con el objetivo arriba.
- [ ] Cada hecho tiene archivo:línea y las suposiciones están marcadas.
- [ ] Comprobaste al menos dos afirmaciones del explorador.
- [ ] No se modificó ningún archivo de código (`git status` solo muestra `docs/specs/`).
