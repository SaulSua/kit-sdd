# Kit SDD web

Para usar en **Claude en el navegador** (claude.ai), sin acceso al código. Sirve para dejar listo el paquete que guía la construcción: **requerimiento, diseño y tareas**. Después se construye en el repositorio, con la herramienta que tenga el equipo.

## Regla de datos: lo primero

**Nunca pegue en el chat:**

- datos de clientes: nombres, C.I., cuentas, teléfonos, correos, montos de clientes reales;
- credenciales, claves, tokens o cadenas de conexión;
- código del banco.

Para todo use ejemplos inventados («cuenta 1001», «Cliente A»). Para describir el sistema alcanza con palabras: «hay un servicio de cuentas y una base de datos de movimientos».

## El orden

Un chat nuevo para cada paso. Cada paso recibe como adjunto el documento del anterior.

| Paso | Skill | Adjunte | Le devuelve | Antes de seguir |
|---|---|---|---|---|
| 1 | `sdd-requerimiento` | (nada, o la constitución) | `requerimiento.md` | Revisión y aprobación de una persona |
| 2 | `sdd-diseno` | `requerimiento.md` aprobado | `diseno.md` | Revisión y aprobación de una persona |
| 3 | `sdd-tareas` | `requerimiento.md` + `diseno.md` aprobados | `tareas.md` | Revisión de coherencia y aprobación del paquete |
| 4 | Construir en el repositorio (no en la web) | los tres | código y pruebas | Ver `implementar.md` |

**La revisión de cada paso**, siempre en un **chat nuevo** con `sdd-revisor`:

- requerimiento: «revisa este requerimiento» + `requerimiento.md`;
- diseño: «revisa este diseño» + `diseno.md` y `requerimiento.md`;
- tareas: «revisa la coherencia de este paquete» + los tres.

Tiene que ser un chat nuevo porque el revisor no tiene que ver cómo se escribió el documento: lo juzga como lo leería otra persona. Si dice DEVOLVER, lleve sus hallazgos al chat donde se escribió el documento y corríjalo allí. Máximo dos vueltas.

**La aprobación** la firma siempre una persona: escribe su nombre y la fecha en la sección Estado del documento. La IA nunca aprueba.

## Lo que el navegador no ve, y cómo se resuelve

El diseño se escribe sin ver el código. Todo lo que supone sobre el sistema va marcado **`[VERIFICAR EN EL CÓDIGO]`** en una tabla de suposiciones (`S-1`, `S-2`...). La primera tarea, **T-0**, es comprobar esas suposiciones en el repositorio. Si una era falsa, el diseño vuelve al paso 2 antes de escribir código.

## Cómo instalar las skills

1. Descargue `zips/sdd-web-plugin.zip`. Es un solo archivo con las cuatro skills.
2. En claude.ai, abra **Plugins → Subir un plugin**.
3. Arrastre el zip y presione **Subir**.

Si prefiere instalarlas por separado, en la misma pantalla puede arrastrar juntos los cuatro zips sueltos: `sdd-requerimiento.zip`, `sdd-diseno.zip`, `sdd-tareas.zip` y `sdd-revisor.zip`.

**Si su plan no tiene Skills:** funciona igual a mano. Al empezar cada chat, adjunte el `SKILL.md` y la `plantilla.md` del paso y escriba «sigue estas instrucciones». Para revisar, adjunte `sdd-revisor/SKILL.md` junto con los documentos.

## Consejos para el plan gratuito

- **Un chat por paso.** Los chats cortos no chocan con el límite de mensajes, y si un paso sale mal se repite solo ese.
- **Descargue cada documento** apenas se lo entregue. El chat no es el archivo.
- Si el chat se corta a mitad de camino, abra uno nuevo, adjunte lo que ya tenía y diga «sigamos desde aquí».

## Qué hay en esta carpeta

| Archivo | Para qué |
|---|---|
| `sdd-requerimiento/` | Paso 1: la entrevista y la plantilla del requerimiento |
| `sdd-diseno/` | Paso 2: el diseño, con su resumen para negocio y sus suposiciones |
| `sdd-tareas/` | Paso 3: las tareas, el plan de pruebas y la cobertura |
| `sdd-revisor/` | La revisión independiente de los tres pasos |
| `implementar.md` | Cómo construir en el repositorio, tarea por tarea, con cualquier herramienta |
| `zips/` | `sdd-web-plugin.zip` (las cuatro skills en un archivo) y cada skill suelta |
