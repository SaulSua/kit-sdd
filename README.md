# Kit SDD de Acendia

Skills y agentes de Claude Code para desarrollar con el método de **desarrollo guiado por especificación (SDD)**: primero se escribe y se aprueba qué se va a hacer, después cómo, después las tareas, y recién ahí el código.

Es genérico a propósito. Cada equipo lo personaliza en su repositorio (`docs/kit/`) sin tocar el kit.

## Instalar

En Claude Code, una sola vez:

```
/plugin marketplace add SaulSua/kit-sdd
/plugin install sdd@acendia-kit
```

Reinicie Claude Code. Para recibir la versión de cada sesión:

```
/plugin marketplace update acendia-kit
```

**Sin plugins** (si la configuración de su organización no los permite): clone este repositorio y copie las carpetas a su proyecto.

```
git clone https://github.com/SaulSua/kit-sdd.git
mkdir -p .claude/skills .claude/agents
cp -r kit-sdd/skills/* .claude/skills/
cp kit-sdd/agents/* .claude/agents/
```

Así los comandos se llaman sin el prefijo: `/requerimiento` en vez de `/sdd:requerimiento`.

## Usar

En la raíz de su repositorio:

| Paso | Comando | Qué deja |
|---|---|---|
| Una vez por repositorio | `/sdd:iniciar` | `docs/kit/` (reglas y plantillas del equipo) y `docs/specs/` |
| 1. Explorar | `/sdd:explorar <funcionalidad>` | `docs/specs/<funcionalidad>/evidencia.md` |
| 2. Requerimiento | `/sdd:requerimiento <funcionalidad>` | `docs/specs/<funcionalidad>/requerimiento.md`, revisado por un agente y listo para que lo apruebe una persona |

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
| 0.4 | 4 · Control y datos | guardián de datos (hook) y revisor de política |
| 0.5 | 5 · Diseño técnico | diseño, arquitecto y revisor de diseño |
| 0.6 | 6 · Tareas y aprobación | tareas y revisor de coherencia |
| 0.7 | 7 · Implementar | implementar con TDD y revisor de desvíos |
| 0.8 | 8 · QA con IA | pruebas desde criterios y auditor de pruebas débiles |
| 0.9 | 9 · Seguridad | revisor de seguridad |
| 1.0 | 10 · Escalar | el flujo completo encadenado |

## Reglas que valen siempre

- Ningún dato de clientes, secreto ni credencial entra a la IA ni al repositorio.
- Las reglas de negocio las decide una persona, no el agente.
- Se lee lo que se aprueba.

## Inspiración

Este kit adapta ideas de proyectos abiertos: la constitución y el revisor de coherencia de [Spec Kit](https://github.com/github/spec-kit) (GitHub), la cadena requerimiento, diseño y tareas de [cc-sdd](https://github.com/gotalab/cc-sdd) (formato Kiro), los agentes de un solo propósito del plugin [feature-dev](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev) (Anthropic) y la disciplina de pruebas de [superpowers](https://github.com/obra/superpowers). Los textos son propios, en español.
