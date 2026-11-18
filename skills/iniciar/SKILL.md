---
name: iniciar
description: Prepara un repositorio para usar el kit SDD. Crea docs/kit/ con las reglas del equipo y copias editables de las plantillas, y la carpeta docs/specs/. Úsalo una vez por repositorio, o cuando el equipo quiera personalizar el kit.
---

# Iniciar el kit en este repositorio

El kit trae instrucciones genéricas. Lo que es de **su equipo** (reglas, plantillas, palabras prohibidas, quién aprueba) vive en el repositorio, en `docs/kit/`, y los skills y agentes lo leen primero. Así se personaliza editando un markdown, sin tocar el plugin, y las actualizaciones del kit no borran nada.

## Pasos

1. Comprueba que estás en la raíz de un repositorio con Git. Si no hay `docs/constitucion.md`, avísale a la persona: es la base (sesión 2) y conviene tenerla antes.
2. Crea, **sin sobrescribir lo que ya exista** (si un archivo existe, no lo toques y avisa):
   - `docs/kit/reglas.md` a partir de `reglas.md` de la carpeta de este skill;
   - `docs/kit/plantillas/requerimiento.md`, copia de `../requerimiento/plantilla.md`;
   - `docs/kit/plantillas/evidencia.md`, copia de `../explorar/plantilla.md`;
   - la carpeta `docs/specs/` con un `README.md` de dos líneas: «Una carpeta por funcionalidad, numerada: `001-nombre/`, `002-nombre/`. Adentro: evidencia, requerimiento y, después, diseño y tareas.»
3. Lee `docs/constitucion.md` si existe y **propón** (no escribas sin confirmar) cómo llenar la sección «Nuestro equipo» de `docs/kit/reglas.md`.
4. Termina con la lista de archivos creados y una línea: «Para personalizar el kit, edite `docs/kit/reglas.md` y las plantillas de `docs/kit/plantillas/`.»
5. Sugiere hacer commit: `git add docs/kit docs/specs && git commit -m "kit SDD"`.
