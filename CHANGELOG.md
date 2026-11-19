# Cambios

## 0.6.0 · sesión 6 · Tareas y aprobación

- Skill `tareas`: tareas chicas con su prueba primero, sus criterios, sus archivos y su punto de corte seguro; plan de pruebas desde los criterios; aprobación del paquete para construir.
- `estado.md`: en qué paso va cada funcionalidad, quién aprobó qué y qué abre el paso siguiente. `requerimiento` y `diseno` lo actualizan.
- Agente `revisor-coherencia`: cruza requerimiento, diseño y tareas (criterios sin tarea, tareas huérfanas, contradicciones, cambios silenciosos, constitución).
- Caso trampa del `revisor-coherencia`.

## 0.5.0 · sesión 5 · Diseño técnico

- Skill `diseno`: el diseño técnico desde el requerimiento aprobado (puerta de entrada), con alternativas, decisiones `D-n`, modelo de datos, contrato, trazabilidad de cada `CA-n`, amenazas, invariantes `INV-n` y chequeo de la constitución con excepciones justificadas.
- Agente `arquitecto`: dos o tres alternativas reales, primero reusando lo que existe, con su comparación y una recomendación. La decisión es de la persona.
- Agente `revisor-diseno`: la constitución como puerta, cobertura de criterios, cambios silenciosos del requerimiento, decisiones sin alternativas y seguridad por diseño.
- Caso trampa del `revisor-diseno`, con su constitución y su requerimiento aprobado.

## 0.4.1 · corrección

- Las descripciones de skills y agentes van entre comillas: con dos puntos adentro, el encabezado no se leía y los agentes perdían su lista de herramientas (solo lectura) y su modelo. Validado con `claude plugin validate`.

## 0.4.0 · sesión 4 · Control y datos

- Skill `entrada`: el paso 0. Clasifica el tipo de trabajo, reproduce el bug con una prueba que falla, propone el tamaño (chico, normal, grande) y el camino.
- Skill `reglas` y agente `lector-de-reglas`: reglas del repositorio por carpeta en `.claude/rules/`, propuestas desde el código con evidencia y aprobadas por el equipo.
- Skill `politica` y agente `revisor-politica`: política de datos, permisos en `.claude/settings.json` y borrador de configuración centralizada para Seguridad de la Información.
- Hook `guardian-datos`: bloquea `.env`, llaves y credenciales, y texto con C.I., cuentas o tarjetas. Patrones propios en `docs/kit/datos-prohibidos.txt`.
- `iniciar` copia también las plantillas nuevas y los archivos del guardián, sin pisar lo existente.
- Casos de prueba: `entrada`, `lector-de-reglas`, `revisor-politica` (con instrucción inyectada) y 16 casos ejecutables del guardián.


## 0.3.0 · sesión 3 · Especificar: del pedido al requerimiento

- Skill `iniciar`: prepara `docs/kit/` y `docs/specs/` en el repositorio.
- Skill `explorar` y agente `explorador`: evidencia del código existente antes de pedir.
- Skill `requerimiento`: entrevista una pregunta a la vez y redacta con criterios Dado / Cuando / Entonces.
- Agente `revisor-requerimiento`: revisión independiente, con veredicto LISTO, LISTO CON OBSERVACIONES o DEVOLVER.
- Casos de prueba de los dos agentes, con caso trampa.
- Reglas de diseño del kit: lee primero con orden de autoridad, regla de rebote, terminado cuando, método común de revisión (qué revisé, confirmado o posible, cómo se verifica) y reporte simple con nombre primero e ID al lado.
- Carpetas numeradas por funcionalidad (`docs/specs/001-nombre/`), reutilizadas si ya existen.
