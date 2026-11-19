---
name: politica
description: Escribe con el equipo la política de datos y permisos del repositorio: qué datos nunca entran a la IA, qué puede hacer el agente sin preguntar, qué tiene que preguntar y qué no puede hacer nunca. Deja docs/kit/politica-datos.md, los permisos en .claude/settings.json, los patrones del guardián de datos y un borrador de configuración centralizada para Seguridad de la Información. Úsalo una vez por repositorio y cuando cambie una regla de seguridad.
---

# Control y datos: qué puede ver y hacer el agente

Las reglas que dependen de que el modelo «se porte bien» no son controles. Este skill deja los límites escritos donde se **cumplen solos**:

| Dónde | Qué controla | Quién lo hace cumplir |
|---|---|---|
| `docs/kit/politica-datos.md` | Qué datos nunca entran, por qué, y qué hacer si aparecen | Las personas y los revisores |
| `.claude/settings.json` (`permissions`) | Qué herramientas y comandos puede usar el agente, con o sin preguntar | Claude Code |
| Guardián de datos (hook del kit) + `docs/kit/datos-prohibidos.txt` | Bloquea archivos de secretos y texto con datos de clientes | Un programa, antes de cada acción |
| Configuración centralizada (borrador) | Lo mismo, impuesto para toda la organización | La administración de Claude (planes Team y Enterprise) |

## Lee primero

1. `docs/constitucion.md` y `docs/kit/reglas.md`.
2. `.claude/settings.json` y `docs/kit/politica-datos.md`, si existen: se actualizan, no se pisan.
3. Plantillas en la carpeta de este skill: `politica-datos.md`, `settings.ejemplo.json`, `configuracion-centralizada.ejemplo.json`.

## 1. Entrevista corta

Una pregunta a la vez, con tu recomendación. Máximo seis:

1. ¿Qué datos de clientes existen en este sistema? (tipos, no ejemplos reales)
2. ¿Hay archivos o carpetas que el agente nunca debe leer? (secretos, respaldos, exportes)
3. ¿Qué comandos puede correr sin preguntar? Recomendación: pruebas, linter, `git status`, `git diff`.
4. ¿Qué tiene que preguntar siempre? Recomendación: instalar dependencias, `git push`, migraciones, cualquier cosa que toque un servidor.
5. ¿Qué no puede hacer nunca? Recomendación: leer `.env` y llaves, `git push --force`, borrar ramas, conectarse a producción.
6. ¿Quién es el contacto de Seguridad de la Información para este repositorio?

## 2. Escribe

1. `docs/kit/politica-datos.md` desde la plantilla.
2. `.claude/settings.json`: agrega o actualiza `permissions.allow`, `permissions.ask` y `permissions.deny` según las respuestas (ver `settings.ejemplo.json`). **No borres** permisos que ya estaban sin preguntarle a la persona.
3. `docs/kit/datos-prohibidos.txt`: patrones propios del equipo para el guardián, uno por línea (expresiones regulares). Por ejemplo, el formato de sus números de cliente.
4. `docs/kit/borrador-configuracion-centralizada.json`: a partir de `configuracion-centralizada.ejemplo.json`, con lo mismo que `settings.json` pero pensado para toda la organización. **Es un borrador para Seguridad de la Información, no se aplica desde aquí.**

## 3. Prueba que funciona

Pídele a la persona que lo compruebe con tres pedidos, cada uno tiene que fallar:

- «Lee el archivo .env» → lo bloquea el guardián o `permissions.deny`.
- «Escribe en un archivo: cliente con C.I. 1234567» → lo bloquea el guardián.
- «Haz git push --force» → `permissions.deny` lo impide.

Y uno que tiene que pasar sin preguntar: «Corre las pruebas».

## 4. Entrega

- Archivos creados o cambiados.
- Qué quedó en `allow`, `ask` y `deny`, en una tabla corta.
- Un recordatorio honesto: **la configuración local la puede cambiar quien tiene la máquina**. La garantía para toda la organización es la configuración centralizada (y, para lo más estricto, la gestión de equipos de la organización). Por eso va el borrador para Seguridad de la Información.
- Sugiere: `git add .claude/settings.json docs/kit && git commit -m "politica de datos y permisos"`.

## Terminado cuando

- [ ] `politica-datos.md` existe y nombra el contacto de Seguridad de la Información.
- [ ] `.claude/settings.json` tiene `allow`, `ask` y `deny`.
- [ ] Las tres pruebas que tienen que fallar, fallan; la que tiene que pasar, pasa.
- [ ] El borrador de configuración centralizada quedó en `docs/kit/`.
