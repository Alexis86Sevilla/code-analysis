# 📊 GitHub Repository Analyzer

Una aplicación web moderna construida con Astro, Tailwind CSS y Vitest que permite analizar repositorios de GitHub y obtener métricas detalladas al instante.

## ✨ Características

- **Análisis de Repositorios**: Ingresa usuario y repositorio para obtener estadísticas completas.
- **Vistas Detalladas**:
    - **General**: Estadísticas clave del repositorio.
    - **Lenguajes**: Distribución de código.
    - **Contribuidores**: Top contribuidores y sus aportaciones.
    - **Actividad**: Historial de commits.
- **Robustez Profesional**: Manejo avanzado de errores de API y estados de carga (UX mejorada).
- **Rendimiento Optimizado**: Carga de fuentes local con Fontsource.
- **Calidad de Código**: Suite de pruebas unitarias automatizada con Vitest.

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web
- **[Tailwind CSS](https://tailwindcss.com)** - Framework de CSS
- **[Vitest](https://vitest.dev)** - Framework de Testing
- **GitHub API** - Fuente de datos

## 📦 Configuración y Variables de Entorno

Para evitar límites de tasa de la API de GitHub, es altamente recomendado configurar un token:

1. Crea un Fine-grained Personal Access Token en GitHub (con permisos de lectura).
2. Configura la variable de entorno `GITHUB_TOKEN` en tu plataforma de despliegue (ej: Cloudflare Pages).

## 🧞 Comandos

| Comando | Acción |
| :--- | :--- |
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Construye el sitio de producción |
| `pnpm test` | Ejecuta la suite de pruebas unitarias |

## 🚀 Cómo Empezar

1. Clona el repositorio.
2. Instala las dependencias con `pnpm install`.
3. Configura `GITHUB_TOKEN` en un archivo `.env` para desarrollo local (opcional).
4. Inicia el servidor con `pnpm dev`.
5. Navega a `http://localhost:4321`.

## 📝 Notas técnicas

- La aplicación está preparada para producción. El uso de `GITHUB_TOKEN` es esencial para un uso fluido.
- Los tests cubren la lógica crítica de procesamiento de datos en `src/utils/`.
