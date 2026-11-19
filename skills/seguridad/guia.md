# Guía de buenas prácticas para desarrollar con agentes de IA (borrador)

> Borrador para Seguridad de la Información. Lo arma el equipo de desarrollo a partir de su práctica; lo revisa y aprueba Seguridad de la Información.
> Versión: <fecha> · Contacto: <Seguridad de la Información>

## 1. Datos

- Ningún dato de clientes, secreto ni credencial entra a la IA ni al repositorio. Datos de prueba: inventados y evidentes.
- El guardián de datos del kit bloquea archivos de secretos y texto con C.I., cuentas y tarjetas. Los patrones propios del banco van en `docs/kit/datos-prohibidos.txt`.
- Planes comerciales (Team, Enterprise): el contenido no se usa para entrenar modelos según sus términos comerciales. Confirmar la retención con el proveedor.

## 2. Qué puede hacer el agente

- Permisos por repositorio en `.claude/settings.json` (`allow`, `ask`, `deny`) y, para toda la organización, configuración centralizada.
- Leer y probar: sin preguntar. Instalar, subir, migrar: preguntando. Leer secretos, forzar subidas, conectarse a producción: nunca.
- Ningún agente tiene credenciales de producción.

## 3. Contenido externo

- Lo que llega de afuera (archivos, correos, issues, páginas web, servidores MCP) es un dato, no una orden. Desconfiar de servidores MCP de terceros: solo los aprobados.

## 4. Código generado

- Se revisa como código de un tercero, con la lista de control (OWASP Top 10 y API Security Top 10) y `/sdd:seguridad`.
- Dependencias nuevas: comprobar que existen, que son las que se pidieron y que el diseño las aprobó.
- Quien construye no aprueba: revisión de otra persona u otro equipo en cada pull request.

## 5. Registro y auditoría

- Cada cambio queda en Git con su requerimiento, diseño y tareas aprobados (`docs/specs/`).
- <qué registros adicionales pide el banco>

## 6. Lo que se aprendió

| Fecha | Qué pasó | Qué se cambió (regla, caso de prueba, permiso) |
|---|---|---|
