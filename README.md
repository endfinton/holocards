# HoloCard Vault 3D

HoloCard Vault 3D será una plataforma web para buscar, visualizar y coleccionar cartas de **Magic: The Gathering**. El objetivo es combinar una experiencia visual atractiva con una base técnica escalable: búsqueda de cartas, autenticación, colección privada y visor 3D con efecto foil.

## Estado actual

Proyecto en fase inicial.

- Fase 1 iniciada: proyecto Next.js creado y dependencias principales instaladas.
- Estructura activa del proyecto alineada bajo `src/app`.
- Pendiente: base de datos, autenticación, integración con Scryfall, APIs propias, visor 3D e interfaz final.

## Cómo ejecutar el proyecto

### Requisitos

- Node.js
- pnpm

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Luego abre:

```text
http://localhost:3000
```

### Compilación

```bash
pnpm build
```

## Cómo interactuar con la aplicación

Por ahora la app muestra la pantalla inicial generada por Next.js. En fases posteriores permitirá:

1. buscar cartas reales desde Scryfall
2. iniciar sesión
3. guardar cartas en una colección personal
4. inspeccionar cartas en 3D con efecto foil

## Estructura del proyecto

```text
src/
├── app/
│   ├── api/
│   ├── collection/
│   ├── search/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── 3d/
│   ├── ui/
│   └── layout/
├── db/
├── lib/
├── services/
├── hooks/
└── styles/
```

## Decisiones técnicas

### Next.js

Se usa Next.js porque ofrece routing, renderizado moderno, soporte para API routes y una buena base para desplegar en Vercel sin añadir infraestructura innecesaria.

### TypeScript

TypeScript reduce errores tempranos y hace más claro el contrato entre servicios, componentes y datos externos como los recibidos desde Scryfall.

### Tailwind CSS

Tailwind permite construir la interfaz con rapidez, mantener consistencia visual y evitar una hoja de estilos global difícil de escalar.

### Three.js + React Three Fiber + Drei

Capricho personal, Three.js aporta el motor 3D. React Three Fiber facilita integrarlo en React, y Drei añade utilidades listas para usar que aceleran el desarrollo del visor de cartas.

### Drizzle ORM + MySQL local

Drizzle ofrece consultas tipadas y parametrizadas. MySQL mediante WAMP permite desarrollar en local con una base de datos accesible y conocida durante las primeras fases.

### Turso en producción

La idea es migrar a Turso más adelante para disponer de una base de datos distribuida, fácil de desplegar y nativa de vercel.

### better-auth

better-auth se usará para gestionar sesiones y restringir la colección privada de cada usuario sin construir autenticación desde cero.

### Zod

Zod permitirá validar datos de entrada antes de escribir en base de datos o consumirlos dentro de la aplicación.

## Documentación de uso de IA

El archivo `AI_LOG.md` registra qué partes fueron generadas con ayuda de IA, qué prompt se usó y qué correcciones que se pidieron.