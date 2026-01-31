# Whiskey Labs Website

A modern, premium web experience for Whiskey Labs featuring a 3D orbital visualization and minimalist dark design.

## Version

**v0.1.0** - Initial Release

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes

## Features

- 🌌 **3D Orbital Visualization** - Interactive planetary system with fuzzy orbital ellipses and glowing spheres
- 🎨 **Dark Burgundy Theme** - Premium dark aesthetic with orange accents
- 📐 **Dashed Grid Layout** - Minimalist grid system with subtle separators
- 🌓 **Theme Switching** - Light/dark mode support
- 📱 **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Project Structure

```
web/
├── app/
│   ├── page.tsx          # Home page
│   ├── contact/page.tsx  # Contact page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── Hero/
│   │   └── ThreeRing.tsx # 3D orbital visualization
│   ├── Layout/
│   │   └── GridSystem.tsx # Grid components
│   ├── Navigation.tsx
│   └── ThemeSwitch.tsx
└── data/
    └── config/
        └── colors.js     # Color palette
```

## Design Credits

Visual design inspired by Stitch by Google.

## License

Private - Whiskey Labs
