---
name: iniciar
description: Prepara un repositorio para usar el kit SDD. Crea docs/kit/ con las reglas del equipo, copias editables de las plantillas y los archivos del guardián de datos, y la carpeta docs/specs/. Úsalo una vez por repositorio, y otra vez después de actualizar el kit para recibir las plantillas nuevas (no pisa lo que ya existe).
---

# Iniciar el kit en este repositorio

El kit trae instrucciones genéricas. Lo que es de **su equipo** (reglas, plantillas, palabras prohibidas, quién aprueba, datos prohibidos) vive en el repositorio, en `docs/kit/`, y los skills y agentes lo leen primero. Así se personaliza editando un markdown, sin tocar el plugin, y las actualizaciones del kit no borran nada.

## Pasos

1. Comprueba que estás en la raíz de un repositorio con Git. Si no hay `docs/constitucion.md`, avísale a la persona: es la base (sesión 2) y conviene tenerla antes.
2. Crea, **sin sobrescribir lo que ya exista** (si un archivo existe, no lo toques y dilo en la lista final). Las rutas de origen son relativas a la carpeta de este skill; **si un origen no existe en esta versión del kit, sáltalo sin error**:

   | Destino en el repositorio | Origen en el kit |
   |---|---|
   | `docs/kit/reglas.md` | `reglas.md` |
   | `docs/kit/plantillas/entrada.md` | `../entrada/plantilla.md` |
   | `docs/kit/plantillas/evidencia.md` | `../explorar/plantilla.md` |
   | `docs/kit/plantillas/requerimiento.md` | `../requerimiento/plantilla.md` |
   | `docs/kit/plantillas/diseno.md` | `../diseno/plantilla.md` |
   | `docs/kit/plantillas/tareas.md` | `../tareas/plantilla.md` |
   | `docs/kit/plantillas/estado.md` | `../tareas/estado.md` |
   | `docs/kit/plantillas/seguridad.md` | `../seguridad/plantilla.md` |
   | `docs/kit/datos-prohibidos.txt` | `datos-prohibidos.txt` |
   | `docs/kit/guardian-permitidos.txt` | `guardian-permitidos.txt` |
   | `docs/kit/lecciones/README.md` | `lecciones.md` |

   Y la carpeta `docs/specs/` con un `README.md` de dos líneas: «Una carpeta por funcionalidad, numerada: `001-nombre/`, `002-nombre/`. Adentro: entrada, evidencia, requerimiento, diseño, tareas y estado.»
3. Lee `docs/constitucion.md` si existe y **propón** (no escribas sin confirmar) cómo llenar la sección «Nuestro equipo» de `docs/kit/reglas.md`.
4. Termina con dos listas: archivos creados y archivos que ya existían (no tocados). Y una línea: «Para personalizar el kit, edite `docs/kit/reglas.md` y las plantillas de `docs/kit/plantillas/`.»
5. Sugiere hacer commit: `git add docs/kit docs/specs && git commit -m "kit SDD"`.
