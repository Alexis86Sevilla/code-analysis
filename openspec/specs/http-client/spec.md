# HTTP Client Specification

## Objetivo
Crear una capa de abstracción robusta para las solicitudes HTTP para reducir la duplicación y mejorar el manejo de errores.

## Requisitos Técnicos
- Basado en `fetch` (u otra librería compatible si se define).
- Implementar timeout por defecto.
- Normalización de respuestas (ej. manejo uniforme de errores 4xx/5xx).
- Soporte para interceptores de autenticación (GitHub tokens).

## API Contract (Draft)
```javascript
interface HttpClient {
  get(url: string, options?: RequestOptions): Promise<Response>;
  post(url: string, body: any, options?: RequestOptions): Promise<Response>;
  // ...
}
```
