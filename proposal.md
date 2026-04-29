# Proposal: improve-index

## Intent
Refactor the home section components (`Hero.astro`, `Features.astro`, `Cta.astro`, `Faq.astro`) to improve maintainability, enhance component encapsulation, and strictly adhere to DRY (Don't Repeat Yourself) principles.

## Scope
1.  **Encapsulation**: Move FAQ component-specific JavaScript logic directly into `Faq.astro`.
2.  **Data-Driven**: Convert static FAQ content into a data-driven structure (array), matching the pattern used in `Features.astro`.
3.  **DRY Refactoring**: Reduce repetition in Tailwind CSS classes across home sections.

## Approach
1.  Define a consistent data schema for FAQ items.
2.  Refactor `Faq.astro` to import this data and manage its own state/logic internally.
3.  Audit Tailwind classes in `src/sections/home/` and extract shared utility patterns where appropriate.
4.  Verify functionality across all affected home sections.
