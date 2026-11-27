# Tareas: <nombre de la funcionalidad>

> En qué pedazos y en qué orden. Sale del diseño aprobado. Cada tarea: prueba primero, punto de corte seguro.
> Requerimiento: `requerimiento.md` · Diseño: `diseno.md` (aprobado por <nombre> el <fecha>)
> Escrito sin ver el código: lo marcado `[A CONFIRMAR EN T-0]` se confirma en el repositorio antes de construir.

## Tareas

### T-0 · Verificar las suposiciones del diseño

- **Verifica:**
  - [ ] S-1: <suposición> · cómo se verifica: <...>
  - [ ] S-2:
  - [ ] Los archivos y módulos de cada tarea existen (reemplazar los `[A CONFIRMAR EN T-0]` por rutas reales).
- **Si alguna es falsa:** se detiene la construcción y el diseño vuelve al paso 2. Afecta a: <tareas>
- **No escribe código.**
- **Estado:** pendiente | hecha (quién y cuándo)

### T-1 · <nombre corto>

- **Cubre:** CA-1, INV-1
- **Prueba que se escribe primero (y tiene que fallar):** <qué comprueba, con los valores del criterio>
- **Dónde se trabaja:** <módulo o parte del sistema> · archivos `[A CONFIRMAR EN T-0]`
- **Hecho cuando:** la prueba pasa, todas las demás siguen pasando, un commit.
- **Depende de:** T-0
- **Estado:** pendiente | en curso | hecha (commit <hash>)

### T-2 · <nombre corto>

- **Cubre:**
- **Prueba primero:**
- **Dónde se trabaja:**
- **Hecho cuando:**
- **Depende de:** T-1
- **Estado:** pendiente

## Plan de pruebas

| Criterio | Prueba | Tipo (unitaria / integración / punta a punta) | Tarea |
|---|---|---|---|
| CA-1 | | | T-1 |

## Cobertura

| Criterio o invariante | Tareas | Prueba en el plan |
|---|---|---|
| CA-1 | T-1 | sí |
| INV-1 | | |

Resumen: <N> criterios, <N> cubiertos · <N> invariantes, <N> con prueba · <N> tareas, <N> huérfanas.

## Aprobación

- Revisión de coherencia (sdd-revisor): <fecha y veredicto>
- **Paquete aprobado para construir por:** <nombre> · <fecha>
