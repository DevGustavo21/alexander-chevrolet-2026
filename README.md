# Alexander Alvarado · Chevrolet Nicaragua

Sitio del asesor Chevrolet Alexander Alvarado, migrado de un single-page
React (CDN + Babel standalone) a **Next.js 15** con App Router.

## Estructura

```
.
├── app/
│   ├── layout.jsx          # Layout raíz (fuentes + carga del web component)
│   ├── page.jsx            # Composición de las 8 secciones
│   ├── globals.css         # Sistema de estilos (antes styles.css)
│   └── components/
│       ├── Logo.jsx
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── Lineup.jsx      # Único client component (useState/useEffect)
│       ├── Experience.jsx
│       ├── Service.jsx
│       ├── News.jsx
│       ├── Community.jsx
│       └── Footer.jsx
├── lib/
│   └── vehicles.js         # Catálogo (antes data.js / window.VEHICLES)
├── public/
│   ├── image-slot.js       # Custom element <image-slot>
│   └── image-slots.state.json  # Sidecar con imágenes ya rellenadas
├── next.config.mjs
├── jsconfig.json
└── package.json
```

## Notas de la migración

- **`<image-slot>`** se mantiene como custom element vanilla y se carga en
  `app/layout.jsx` con `next/script` en `strategy="beforeInteractive"` —
  así está registrado antes de la hidratación de React.
- Los componentes son **Server Components** por defecto. Sólo `Lineup` se
  marca con `'use client'` porque usa hooks (`useState`, `useEffect`,
  `useMemo`) y `onClick` handlers.
- El sidecar de imágenes pasó de `.image-slots.state.json` (en la raíz) a
  `public/image-slots.state.json`. Se quitó el punto inicial porque Next.js
  no sirve dotfiles desde `public/`. La constante `STATE_FILE` en
  `image-slot.js` se actualizó en consecuencia.
- En desarrollo bajo el bridge original (`window.omelette.writeFile`) la
  persistencia escribía el sidecar al hacer drop. En un Next.js estándar
  ese bridge no existe — las imágenes ya guardadas se siguen viendo, pero
  un nuevo drop sólo persiste para la sesión actual. Si quisieras
  persistencia real podés añadir una API route que escriba al sidecar.

## Scripts

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo en http://localhost:3000
npm run build   # build de producción
npm start       # servir el build
```
