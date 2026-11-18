---
name: explorar
description: Explora el código que toca una funcionalidad (sobre todo código heredado) con el agente explorador y deja la evidencia escrita en docs/specs/<funcionalidad>/evidencia.md, con las reglas escondidas, los riesgos y las preguntas para negocio. Úsalo antes de escribir un requerimiento que cambia código existente. No modifica código.
argument-hint: "[funcionalidad o archivo a explorar]"
---

# Explorar antes de pedir

Antes de pedir un cambio, hay que saber qué hace hoy el código. Este skill manda al agente **explorador** a leer el código y deja lo que encontró por escrito, para que la entrevista del requerimiento parta de hechos.

**No modifiques código en este skill.**

## 1. Qué explorar

1. Lee, si existen: `docs/constitucion.md`, `CLAUDE.md` y `docs/kit/reglas.md`.
2. Si el pedido (`$ARGUMENTS`) dice qué explorar, úsalo. Si no, pregunta en una frase: «¿Qué funcionalidad quiere cambiar, o qué archivo quiere entender?».
3. Ponle un nombre corto en minúsculas con guiones. La carpeta es `docs/specs/<nombre>/`.

## 2. Lanza al explorador

Lanza el agente **explorador** (en el plugin se llama `sdd:explorador`). Pásale:

- qué funcionalidad o archivos explorar;
- para qué cambio futuro (una frase);
- que devuelva las secciones de su formato.

Si el código es grande y hay partes independientes, puedes lanzar dos o tres exploradores en paralelo, cada uno con una parte.

## 3. Escribe la evidencia

Plantilla: usa `docs/kit/plantillas/evidencia.md` si existe. Si no, usa `plantilla.md` de la carpeta de este skill.

Escribe `docs/specs/<nombre>/evidencia.md` con lo que devolvió el explorador. Antes de guardar:

- **Comprueba tú dos o tres afirmaciones** abriendo el archivo y la línea que citó. Si una no se sostiene, corrígela o sácala.
- **Ningún dato real** de clientes, credenciales ni secretos en el archivo.
- Las «reglas encontradas» quedan como preguntas: tú no decides si son regla o error.

## 4. Entrega

Muéstrale a la persona, en pocas líneas:

- qué hace el código, en dos frases;
- las **preguntas para negocio** (son lo más valioso: alguien tiene que decidirlas);
- los riesgos más serios.

Siguiente paso: `/sdd:requerimiento <nombre>`, que usa esta evidencia en la entrevista.
