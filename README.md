# 📊 GitHub Repository Analyzer

Una aplicación web moderna construida con Astro y Tailwind CSS que permite analizar repositorios de GitHub y obtener métricas detalladas al instante.

## ✨ Características

- **Análisis de Repositorios**: Ingresa el usuario y nombre del repositorio para obtener estadísticas completas
- **Vista General**: Información básica del repositorio (descripción, estrellas, forks, issues, etc.)
- **Lenguajes de Programación**: Visualización de los lenguajes utilizados en el proyecto
- **Contribuidores**: Lista de colaboradores con sus estadísticas de contribución
- **Actividad de Commits**: Gráfico de actividad de commits a lo largo del tiempo
- **Diseño Moderno**: Interfaz con gradientes, glassmorphism y efectos visuales atractivos

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   └── footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro                    # Página principal (landing)
│   │   ├── analyze.astro                  # Página de análisis
│   │   └── api/
│   │       └── github.js                  # API endpoint para GitHub
│   ├── sections/
│   │   ├── home/
│   │   │   ├── Hero.astro                 # Sección hero de la landing
│   │   │   ├── Features.astro             # Características
│   │   │   ├── Cta.astro                  # Call to action
│   │   │   └── Faq.astro                  # Preguntas frecuentes
│   │   └── analyze/
│   │       ├── form.astro                 # Formulario de búsqueda
│   │       └── tabs/
│   │           ├── tabsContainer.astro
│   │           ├── overview.astro         # Tab de vista general
│   │           ├── languages.astro        # Tab de lenguajes
│   │           ├── contributors.astro     # Tab de contribuidores
│   │           └── activity.astro         # Tab de actividad
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── fetchData.js                   # Utilidad para fetch de datos
│       ├── renderOverview.js              # Renderizado de vista general
│       ├── renderLanguages.js             # Renderizado de lenguajes
│       ├── renderContributors.js          # Renderizado de contribuidores
│       └── renderActivity.js              # Renderizado de actividad
└── package.json
```

## 🛠️ Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web
- **[Tailwind CSS](https://tailwindcss.com)** - Framework de CSS utility-first
- **GitHub API** - Para obtener datos de repositorios

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                | Acción                                               |
| :--------------------- | :--------------------------------------------------- |
| `pnpm install`         | Instala las dependencias                             |
| `pnpm dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build`           | Construye el sitio de producción en `./dist/`        |
| `pnpm preview`         | Previsualiza la build localmente antes de desplegar  |
| `pnpm astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check` |
| `pnpm astro -- --help` | Obtén ayuda usando el CLI de Astro                   |

## � Cómo Usar

1. Clona el repositorio
2. Instala las dependencias con `pnpm install`
3. Inicia el servidor de desarrollo con `pnpm dev`
4. Navega a `http://localhost:4321`
5. Ingresa el usuario y nombre del repositorio de GitHub que deseas analizar
6. Explora las diferentes pestañas con las métricas del repositorio

## 📝 Notas

- La aplicación utiliza la API pública de GitHub, por lo que puede haber límites de tasa si se realizan muchas consultas
