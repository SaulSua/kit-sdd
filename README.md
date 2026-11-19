# Kit SDD de Acendia

Skills y agentes de Claude Code para desarrollar con el método de **desarrollo guiado por especificación (SDD)**: primero se escribe y se aprueba qué se va a hacer, después cómo, después las tareas, y recién ahí el código.

Es genérico a propósito. Cada equipo lo personaliza en su repositorio (`docs/kit/`) sin tocar el kit.

## Instalar

En Claude Code, una sola vez:

```
/plugin marketplace add SaulSua/kit-sdd
/plugin install sdd@acendia-kit
```

Reinicie Claude Code. Para recibir la versión de cada sesión, desde una terminal (fuera de Claude Code):

```
claude plugin marketplace update acendia-kit
claude plugin update sdd@acendia-kit
```

Después, en su repositorio, `/sdd:iniciar` otra vez: copia las plantillas nuevas y no toca lo que ya personalizó.

**Requisito:** Node.js 18 o superior (el guardián de datos es un programa en Node).

**Sin plugins** (si la configuración de su organización no los permite): clone este repositorio y copie las carpetas a su proyecto.

```
git clone https://github.com/SaulSua/kit-sdd.git
mkdir -p .claude/skills .claude/agents
cp -r kit-sdd/skills/* .claude/skills/
cp kit-sdd/agents/* .claude/agents/
```

Así los comandos se llaman sin el prefijo: `/requerimiento` en vez de `/sdd:requerimiento`.

Sin plugin, el guardián de datos no se activa solo: copie `kit-sdd/hooks/guardian-datos.js` a `.claude/hooks/` y agregue a `.claude/settings.json` un hook `PreToolUse` con matcher `Read|Edit|Write|MultiEdit|NotebookEdit|Bash|PowerShell` y comando `node .claude/hooks/guardian-datos.js` (ver `hooks/hooks.json`).

## Usar

En la raíz de su repositorio:

| Paso | Comando | Qué deja |
|---|---|---|
| Una vez por repositorio | `/sdd:iniciar` | `docs/kit/` (reglas y plantillas del equipo) y `docs/specs/` |
| Una vez por repositorio | `/sdd:politica` | `docs/kit/politica-datos.md`, permisos en `.claude/settings.json`, borrador de configuración centralizada |
| Una vez por repositorio | `/sdd:reglas` | `.claude/rules/<area>.md`: reglas por carpeta, propuestas desde su código y aprobadas por el equipo |
| 0. Diagnosticar | `/sdd:entrada <pedido>` | `docs/specs/001-<nombre>/entrada.md`: tipo, evidencia (la prueba que falla si es bug), tamaño y camino |
| 1. Explorar | `/sdd:explorar <funcionalidad>` | `docs/specs/001-<funcionalidad>/evidencia.md` |
| 2. Requerimiento | `/sdd:requerimiento <funcionalidad>` | `docs/specs/001-<funcionalidad>/requerimiento.md`, revisado por un agente y listo para que lo apruebe una persona |
| 3. Diseño técnico | `/sdd:diseno <funcionalidad>` | `diseno.md`: alternativas, decisiones, modelo de datos, contrato, amenazas, invariantes y chequeo de la constitución. **Empieza solo con el requerimiento aprobado** |
| 4. Tareas | `/sdd:tareas <funcionalidad>` | `tareas.md` (tareas chicas, cada una con su prueba primero) y `estado.md`; revisión de coherencia y aprobación del paquete para construir |
| 5. Implementar | `/sdd:implementar <funcionalidad> [T-n]` | Código tarea por tarea con TDD: la prueba falla primero, revisión de desvíos, commit chico por tarea, pull request al final |

**Siempre activo:** el **guardián de datos** (un hook) bloquea, antes de que pase, la lectura de `.env`, llaves y credenciales, y la escritura de texto con C.I., números de cuenta o tarjetas.

Una funcionalidad, una carpeta numerada. Si la carpeta ya existe, el kit la reutiliza.

## Cómo está hecho

Cada paso del método tiene dos piezas:

- **Un skill que produce con usted.** Conversa, pregunta y llena la plantilla. Se llama con `/sdd:<nombre>`.
- **Un agente que revisa.** Arranca en blanco, solo lee y no sabe cómo se hizo el documento. Por eso revisa sin sesgo. **Quien produce no aprueba:** el agente dice si está listo y una persona firma.

| Pieza | Tipo | Hace |
|---|---|---|
| `iniciar` | skill | Prepara el repositorio para el kit |
| `explorar` | skill | Manda al explorador y escribe la evidencia |
| `explorador` | agente | Lee el código heredado y documenta reglas escondidas, riesgos y preguntas para negocio |
| `requerimiento` | skill | Entrevista una pregunta a la vez y redacta el requerimiento |
| `revisor-requerimiento` | agente | Comprueba que cada criterio se pueda verificar y que no haya reglas sin decidir ni datos reales |
| `entrada` | skill | Diagnostica el pedido: tipo, reproduce el bug, tamaño y camino |
| `reglas` | skill | Escribe las reglas por carpeta en `.claude/rules/` con la aprobación del equipo |
| `lector-de-reglas` | agente | Lee el código y propone las reglas que el equipo ya sigue, con evidencia |
| `politica` | skill | Política de datos, permisos y borrador de configuración centralizada |
| `revisor-politica` | agente | Revisa documentos y cambios contra la política de datos |
| `guardian-datos` | hook | Bloquea secretos y datos de clientes antes de que el agente los lea o escriba |
| `diseno` | skill | Escribe el diseño técnico desde el requerimiento aprobado |
| `arquitecto` | agente | Propone dos o tres alternativas, primero reusando lo que existe, y recomienda una |
| `revisor-diseno` | agente | Revisa cobertura de criterios, decisiones, amenazas y la constitución como puerta |
| `tareas` | skill | Divide el diseño en tareas con prueba primero, arma el plan de pruebas y el estado |
| `revisor-coherencia` | agente | Cruza requerimiento, diseño y tareas: cobertura, contradicciones, cambios silenciosos |
| `implementar` | skill | Construye tarea por tarea con TDD, revisión y commit chico; prepara el PR |
| `implementador` | agente | Hace una sola tarea: prueba que falla, código mínimo, suite en verde. Nunca cambia una prueba para que pase |
| `revisor-desvios` | agente | Revisa el cambio contra la tarea y el diseño: archivos de más, pruebas tocadas, lógica no aprobada |

## Reglas de diseño del kit

Valen para cada skill y cada agente, los de hoy y los que vienen:

- **Lee primero, con orden de autoridad.** Cada pieza dice qué archivos lee y cuál manda si chocan: constitución, reglas del equipo, documento aprobado del paso anterior, evidencia, chat.
- **Se trabaja desde archivos, no desde la memoria del chat.** Cada paso empieza leyendo lo que dejó el anterior.
- **Puerta de entrada.** Un paso no empieza si el anterior no está aprobado por una persona (desde el diseño en adelante).
- **Regla de rebote.** Si falta una decisión, se vuelve al paso anterior o queda como `[POR DEFINIR]`. Nunca se inventa.
- **Terminado cuando.** Cada skill termina con su lista de comprobación.
- **Un solo método de revisión.** Todo revisor dice qué revisó, no se deja convencer por lo prolijo, marca cada hallazgo como confirmado o posible con cómo verificarlo, y nunca corrige: devuelve.
- **Reporta simple.** Corto, nombre primero e ID al lado.

## Personalizar

Corra `/sdd:iniciar` y edite:

- `docs/kit/reglas.md`: reglas de su equipo (quién aprueba, moneda, zona horaria, palabras prohibidas, datos que nunca entran). Todos los skills y agentes lo leen primero.
- `docs/kit/plantillas/`: las plantillas que usan los skills. Agregue o quite secciones.

Si necesita cambiar cómo trabaja un agente, cópielo a `.claude/agents/` de su repositorio con otro nombre y edítelo.

## Probar un agente antes de confiar en él

Cada agente trae sus casos en `casos/`, incluido un **caso trampa**: un documento con errores sembrados que el agente tiene que encontrar. Si se le escapa uno marcado con ★, el agente no está listo. Vea `casos/*/esperado.md`.

## Qué viene

| Versión | Sesión | Suma |
|---|---|---|
| 0.3 | 3 · Especificar | explorar, requerimiento y sus agentes |
| 0.4 | 4 · Control y datos | reglas del repositorio por carpeta (backend, frontend, pruebas, datos) propuestas por un agente que lee su código; guardián de datos (hook) y revisor de política |
| 0.5 | 5 · Diseño técnico | diseño, arquitecto y revisor de diseño; la constitución como puerta del diseño |
| 0.6 | 6 · Tareas y aprobación | tareas, estado de la funcionalidad y revisor de coherencia |
| 0.7 | 7 · Implementar | implementar con TDD y revisor de desvíos |
| 0.8 | 8 · QA con IA | pruebas desde criterios y auditor de pruebas débiles |
| 0.9 | 9 · Seguridad | revisor de seguridad |
| 1.0 | 10 · Escalar | el flujo completo encadenado, memoria de lecciones del equipo y atajo para trabajos chicos |

## Reglas que valen siempre

- Ningún dato de clientes, secreto ni credencial entra a la IA ni al repositorio.
- Las reglas de negocio las decide una persona, no el agente.
- Se lee lo que se aprueba.

## Inspiración

Este kit adapta ideas de proyectos abiertos y de fábricas de software con agentes en producción: la constitución, la constitución como puerta y el revisor de coherencia de [Spec Kit](https://github.com/github/spec-kit) (GitHub), la cadena requerimiento, diseño y tareas de [cc-sdd](https://github.com/gotalab/cc-sdd) (formato Kiro), los agentes de un solo propósito del plugin [feature-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev) (Anthropic) y la disciplina de pruebas de [superpowers](https://github.com/obra/superpowers). Los textos son propios, en español.
