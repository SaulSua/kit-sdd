---
name: leccion
description: "Registra una lección del equipo cuando un agente o una persona se equivocó, y la convierte en algo que evite repetirla - una regla (en un solo lugar), un caso de prueba nuevo para el agente que falló (la regla de regresión) o nada si fue aislado. Deja docs/kit/lecciones/<fecha>-<tema>.md. Úsalo cuando el agente se equivoca dos veces en lo mismo, cuando un revisor dejó pasar algo, o después de un incidente."
argument-hint: "[qué pasó, en una frase]"
---

# Lecciones: que el mismo error no pase dos veces

Un agente que falla y nadie lo anota, falla igual mañana. Cada lección termina en **una de tres salidas**: una regla, un caso de prueba o nada.

## Lee primero

1. `docs/kit/lecciones/`: ¿ya hay una lección parecida? Si sí, se actualiza esa, no se crea otra.
2. `docs/constitucion.md`, `docs/kit/reglas.md`, `.claude/rules/`: para saber si la regla ya existe (y no se cumplió) o falta.

## 1. Qué pasó

Pregunta lo mínimo, una cosa a la vez: qué pasó, qué agente o paso estaba involucrado, qué se esperaba y cómo se notó. **Sin datos de clientes**: si el error involucró datos reales, se describe el tipo de dato, no el dato.

## 2. Por qué pasó

Una de estas, con evidencia:

- **Faltaba la regla:** nadie lo había escrito.
- **La regla estaba, pero en un lugar que el agente no lee**, o duplicada y contradictoria.
- **El agente la ignoró:** la regla estaba en su contexto y no la siguió.
- **El caso no estaba en sus pruebas:** el revisor nunca había visto este error.
- **Fue aislado:** algo del entorno o de un dato puntual.

## 3. La salida

| Causa | Salida |
|---|---|
| Faltaba la regla | Escribirla **en un solo lugar**: constitución (si es un principio), `.claude/rules/<area>.md` (si es de una parte del código) o `docs/kit/reglas.md` (si es del kit). Con `/sdd:reglas` si es por carpeta |
| Regla en mal lugar o duplicada | Moverla o dejar una sola |
| El agente la ignoró, o el caso no estaba | **Un caso de prueba nuevo** para ese agente en `docs/kit/casos/<agente>/`, con lo que tiene que encontrar. Si el agente es del kit, sugerir que se reporte para la próxima versión |
| Aislado | Nada. Se anota y se cierra |

**La regla de regresión:** cada falla de un agente se vuelve un caso de prueba. Antes de usar una versión nueva del agente, tiene que pasar todos los casos que alguna vez fallaron.

Muéstrale a la persona la salida propuesta y **pide su aprobación** antes de escribir una regla o un caso.

## 4. Escribe

`docs/kit/lecciones/AAAA-MM-DD-<tema>.md`:

```markdown
# <tema>
- Fecha: · Quién la registró:
- Qué pasó:
- Por qué:
- Salida: regla en <archivo> | caso en <archivo> | nada
- Estado: abierta | cerrada (con el commit)
```

## Terminado cuando

- [ ] La lección tiene causa y salida.
- [ ] Si la salida es una regla o un caso, quedó escrito y aprobado.
- [ ] No quedó la misma regla en dos lugares.
