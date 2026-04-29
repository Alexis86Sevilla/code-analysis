# Delta Spec: Separación de Renderers

## Objetivo
Separar la lógica de renderizado de la lógica de procesamiento de datos en los archivos `src/utils/render*.js`.

## Cambios
- Identificar funciones de transformación de datos y moverlas a una capa de servicio/utils de datos.
- `render*.js` solo debe ocuparse de generar la representación visual (HTML/DOM).
- Implementar un patrón de inyección de datos para los renderers.

## Criterios de Aceptación
- Código de renderizado más limpio y enfocado en UI.
- Lógica de datos unit-testable de forma independiente.
