# Delta Spec: `api/github.js`

## Objetivo
Refactorizar `api/github.js` para utilizar el nuevo cliente HTTP robusto.

## Cambios
- Eliminar lógica de `fetch` cruda.
- Inyectar o importar la nueva instancia de `HttpClient`.
- Centralizar el manejo de tokens de GitHub en el cliente (via interceptor).

## Criterios de Aceptación
- Las llamadas a la API de GitHub siguen funcionando.
- No hay lógica de `fetch` directa en `api/github.js`.
