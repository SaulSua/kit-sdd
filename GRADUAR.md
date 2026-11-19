# Graduar el kit: llevarlo a los repositorios del banco

Durante el taller el kit se usa como plugin, igual para todos. Al terminar, cada equipo lo **gradúa**: lo copia a su repositorio real, lo adapta y desde ahí es suyo, versionado con su código.

## Por qué graduarlo

- **Queda versionado con el código:** cada cambio a un agente pasa por un pull request y una revisión, como cualquier código.
- **Todo el que clona el repositorio lo tiene**, sin instalar nada.
- **Se adapta al sistema real:** stack, reglas, datos prohibidos, quién aprueba.
- **No depende de nosotros** ni de un repositorio externo.

## Pasos

1. **Copiar** a la raíz del repositorio del equipo:
   ```
   git clone https://github.com/SaulSua/kit-sdd.git /tmp/kit-sdd
   mkdir -p .claude/skills .claude/agents .claude/hooks
   cp -r /tmp/kit-sdd/skills/* .claude/skills/
   cp /tmp/kit-sdd/agents/* .claude/agents/
   cp /tmp/kit-sdd/hooks/guardian-datos.js .claude/hooks/
   ```
2. **Activar el guardián** en `.claude/settings.json` (el plugin lo hacía solo):
   ```json
   {
     "hooks": {
       "PreToolUse": [
         { "matcher": "Read|Edit|Write|MultiEdit|NotebookEdit|Bash|PowerShell",
           "hooks": [ { "type": "command", "command": "node .claude/hooks/guardian-datos.js", "timeout": 10 } ] }
       ]
     }
   }
   ```
3. **Desinstalar el plugin** en las máquinas del equipo, para que no haya dos copias de cada agente: `claude plugin uninstall sdd@acendia-kit`. Los comandos pasan a llamarse sin prefijo: `/requerimiento`, `/diseno`.
4. **Iniciar y personalizar** en ese repositorio: `/iniciar`, `/politica`, `/reglas`. Constitución y `CLAUDE.md` del sistema real.
5. **Copiar los casos de prueba** que les sirvan a `docs/kit/casos/` y **agregar los suyos**, con errores reales de su sistema (sin datos de clientes).
6. **Probar cada agente** contra sus casos antes de usarlo (`esperado.md`). Un agente adaptado que no pasa sus casos no se usa.
7. **Pull request** con todo, revisado por otro equipo y, para la política y el guardián, por Seguridad de la Información.

## Mantenerlo vivo

- Cuando un agente se equivoca dos veces en lo mismo: `/leccion`. Termina en una regla o en un caso de prueba nuevo.
- Cada cambio a un agente o a una regla: pull request + correr sus casos.
- Revisar el kit cada trimestre: qué agentes se usan, cuáles no, qué reglas sobran.
- Las versiones nuevas del kit de Acendia se pueden comparar con lo graduado (`git diff`) y traer solo lo que sirva.
