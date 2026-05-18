# HoloCard Vault 3D

HoloCard Vault 3D será una plataforma web para buscar, visualizar y coleccionar cartas de **Magic: The Gathering**. El objetivo es combinar una experiencia visual atractiva con una base técnica escalable: búsqueda de cartas, autenticación, colección privada y visor 3D con efecto foil.

## Estado actual

Proyecto en fase inicial, con **Fase 1** y **Fase 2** completadas.

- Proyecto Next.js creado con TypeScript, Tailwind y ESLint.
- Estructura activa alineada bajo `src/`.
- Búsqueda real de cartas conectada a Scryfall.
- Página funcional disponible en `/search`.
- Resultados mostrados en una rejilla responsive con imagen, nombre y rareza.
- Vista previa 3D inicial al pulsar una carta de búsqueda.
- Modal con fondo atenuado y giro manual de la carta con el ratón.
- Límite de resultados aplicado para evitar listados demasiado grandes.
- Soporte interno para cartas de doble cara en el servicio de Scryfall.

Pendiente:

- visor 3D
- base de datos
- autenticación
- route handlers propios
- interfaz funcional completa
- CSS y pulido visual
- despliegue final

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

### Búsqueda de cartas

Abre:

```text
http://localhost:3000/search
```

Escribe el nombre de una carta y envía el formulario. La aplicación consulta Scryfall y muestra una rejilla responsive de resultados con:

- imagen
- nombre
- rareza

Pulsa una carta con imagen para abrir su vista previa 3D. En la vista 3D puedes arrastrar desde cualquier punto del visor para girar la carta, usar la rueda del ratón para acercar o alejar la cámara y cerrar la vista con la X, el fondo oscuro o la tecla Escape.

Ejemplo:

```text
http://localhost:3000/search?q=ring
```

## Estructura del proyecto

```text
src/
├── app/
│   ├── api/
│   ├── collection/
│   ├── search/
│   │   └── page.tsx
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
│   ├── scryfall.ts
├── hooks/
└── styles/
```

## Decisiones técnicas

### Next.js

Se usa Next.js porque ofrece routing, renderizado moderno, soporte para route handlers y una buena base para desplegar en Vercel sin añadir infraestructura innecesaria.

### TypeScript

TypeScript reduce errores tempranos y hace más claro el contrato entre servicios, componentes y datos externos como los recibidos desde Scryfall.

### Tailwind CSS

Tailwind queda instalado desde el inicio, pero el trabajo visual se reservará para la fase específica de CSS y pulido visual.

### Three.js + React Three Fiber + Drei

Three.js aportará el motor 3D. React Three Fiber facilitará integrarlo en React, y Drei añadirá utilidades listas para usar que acelerarán el desarrollo del visor de cartas.

### Scryfall

Scryfall se usa como fuente de datos pública para buscar cartas reales de Magic: The Gathering. El proyecto encapsula esa integración en `src/services/scryfall.ts` para no acoplar la interfaz directamente a la API externa.

### Drizzle ORM + MySQL local

Drizzle ofrecerá consultas tipadas y parametrizadas. MySQL mediante WAMP permitirá desarrollar en local con una base de datos accesible durante las primeras fases de persistencia.

### Turso en producción

La idea es migrar a Turso más adelante para disponer de una base de datos distribuida y fácil de desplegar.

### better-auth

better-auth se usará para gestionar sesiones y restringir la colección privada de cada usuario sin construir autenticación desde cero.

### Zod

Zod permitirá validar datos de entrada antes de escribir en base de datos o consumirlos dentro de la aplicación.

## Documentación de uso de IA

El archivo `AI_LOG.md` registra qué partes fueron generadas con ayuda de IA, qué prompt se usó y qué correcciones pidió después el usuario.
