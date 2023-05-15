<h1 align="center"><a href="http://cinehu3.ddns.net:8096"><img alt="Logo Banner" width="500" src="http://cinehu3.ddns.net:8096/web/assets/img/logoHeader.png"/></a></h1>
<h3 align="center">Projeto personalizado pela equipe <a href="https://ganguehu3.wixsite.com/preto">GangueHu3</a></h3>

---

<p align="center">
<a href="https://github.com/jellyfin/jellyfin-web">
<img alt="GPL 2.0 License" src="https://img.shields.io/github/license/jellyfin/jellyfin-web.svg"/>
</a>
</p>

O CineHu3 é uma plataforma de streaming de vídeo desenvolvida por um grupo de amigos, com base no JellyFin. Adaptando o JellyFin para criar uma experiência de streaming personalizada e de alta qualidade. É importante ressaltar que o CineHu3 é uma iniciativa independente, sem envolvimento direto com a equipe do JellyFin ou faturamento relacionado. A plataforma valoriza a comunidade de código aberto e segue as diretrizes do JellyFin.

## Build Process

### Dependencies

- [Node.js](https://nodejs.org/en/download)
- npm (included in Node.js)

### Getting Started

1. Clone or download this repository.

   ```sh
   git clone https://github.com/jellyfin/jellyfin-web.git
   cd jellyfin-web
   ```

2. Install build dependencies in the project directory.

   ```sh
   npm install
   ```

3. Run the web client with webpack for local development.

   ```sh
   npm start
   ```

4. Build the client with sourcemaps available.

   ```sh
   npm run build:development
   ```

## Directory Structure

```
.
└── src
    ├── apps
    │   ├── experimental  # New experimental app layout
    │   └── stable        # Classic (stable) app layout
    ├── assets            # Static assets
    ├── components        # Higher order visual components and React components
    ├── controllers       # Legacy page views and controllers 🧹
    ├── elements          # Basic webcomponents and React wrappers 🧹
    ├── hooks             # Custom React hooks
    ├── legacy            # Polyfills for legacy browsers
    ├── libraries         # Third party libraries 🧹
    ├── plugins           # Client plugins
    ├── routes            # React routes/pages
    ├── scripts           # Random assortment of visual components and utilities 🐉
    ├── strings           # Translation files
    ├── styles            # Common app Sass stylesheets
    ├── themes            # CSS themes
    ├── types             # Common TypeScript interfaces/types
    └── utils             # Utility functions
```

- 🧹 &mdash; Needs cleanup
- 🐉 &mdash; Serious mess (Here be dragons)
