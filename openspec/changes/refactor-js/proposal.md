# Refactoring Proposal: JS Codebase Optimization (refactor-js)

## Intent
Improve robustness, maintainability, and separation of concerns in core JavaScript utilities and API handling to resolve fragility in promise management, weak error handling, and tight coupling between data logic and rendering.

## Scope
- `src/utils/fetchData.js`: Centralize fetching logic with robust error handling.
- `src/pages/api/github.js`: Standardize and simplify promise handling.
- `src/utils/render*.js`: Extract data transformation logic into service/util files to separate concerns from DOM/Chart.js rendering.

## Approach
1.  **Robust Client:** Develop a robust `HttpClient` in `src/utils/httpClient.js` to handle errors, timeouts, and headers consistently.
2.  **API Refactor:** Update `src/pages/api/github.js` to use the new `HttpClient`, ensuring cleaner promise handling (e.g., `Promise.all` or async/await chains).
3.  **Separation of Concerns:** For each renderer, identify data processing steps, move them to corresponding `services/*.js` or `utils/*.js` files, and leave the renderer files (`render*.js`) responsible *only* for UI/Chart.js configuration.

## Benefits
- Improved error feedback.
- Increased code maintainability and testability.
- Clearer project structure.

## Risks
- Potential regression in existing UI renderings if coupling is deeper than anticipated.
- Breaking changes if API response structures are inadvertently altered.
