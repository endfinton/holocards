# HoloCard Vault 3D

HoloCard Vault 3D es una plataforma web en construccion para buscar, visualizar y coleccionar cartas de **Magic: The Gathering**. El objetivo es combinar busqueda real con Scryfall, visor 3D con efecto foil, base de datos local con Drizzle, autenticacion y coleccion privada.

### Funcionamiento

```text
https://holocards.vercel.app/
```

## Como interactuar con la aplicacion

### Busqueda de cartas

Escribe el nombre de una carta y envia el formulario. La aplicacion consulta Scryfall y muestra una rejilla responsive de resultados con:

- imagen
- nombre
- rareza
- boton `Guardar en boveda`

### Visor 3D

Pulsa una carta con imagen para abrir su vista previa 3D.

En el visor puedes:

- arrastrar desde cualquier punto para girar la carta
- usar la rueda del raton para acercar o alejar la camara
- cerrar con la `X`
- cerrar con `Escape`

El visor ocupa toda la pantalla y bloquea el scroll de la pagina mientras esta abierto.

Las cartas de rareza `rare` y `mythic` usan un shader foil. Las demas rarezas usan material estandar.

### Autenticacion

Desde esa pantalla puedes:

- crear una cuenta con nombre, email y contrasena
- iniciar sesion con email y contrasena
- volver a inicio o ir a busqueda

Al completar correctamente el formulario, la aplicacion redirige a `/search`.

### Boveda / coleccion

Desde `/search`, cada carta muestra el boton `Guardar en boveda`. Al pulsarlo:

- si el usuario no esta autenticado, se redirige a `/login`
- si el usuario esta autenticado, se guarda la carta en `collection_cards`
- si la carta ya existia para ese usuario, se actualiza sin crear duplicado

La coleccion muestra las cartas guardadas del usuario actual. Al pulsar una carta con imagen, se abre el mismo visor ThreeJS fullscreen usado en la busqueda. Cada carta guardada incluye un boton pequeno `Eliminar` para quitarla de la boveda.

## Decisiones tecnicas

### Next.js

Se usa Next.js porque ofrece routing, renderizado moderno, soporte para route handlers y una buena base para desplegar en Vercel sin anadir infraestructura innecesaria.

### TypeScript

TypeScript reduce errores tempranos y hace mas claro el contrato entre servicios, componentes y datos externos como los recibidos desde Scryfall.

### Tailwind CSS

Se ha elegido Tailwind CSS por su enfoque utility-first, que permite un desarrollo de UI extremadamente rápido, consistente y mantenible. Su uso facilita la creación de diseños responsivos complejos, optimizando el flujo de trabajo al evitar la fragmentación en múltiples archivos CSS externos.

### Scryfall

Scryfall se usa como fuente de datos publica para buscar cartas reales de Magic: The Gathering. La integracion vive en `src/services/scryfall.ts`.

### Proxy local de imagenes

El visor 3D no carga directamente las imagenes remotas de Scryfall como texturas porque WebGL necesita permisos CORS adecuados. Para evitarlo, la app sirve esas imagenes desde `/api/card-image`, manteniendo un allowlist limitado a `cards.scryfall.io`.

### Three.js + React Three Fiber + Drei

Three.js aporta el motor 3D. React Three Fiber integra la escena en React y Drei aporta utilidades como `PerspectiveCamera` y `useTexture`.

La Fase 3 incluye:

- canvas 3D
- carta fina con textura
- giro manual
- zoom de camara
- visor fullscreen
- shader foil para `rare` y `mythic`

Esta eleccion ha sido puramente personal, descubri esta libreria hace un tiempo y queria hacer un proyecto usandola.

### Drizzle ORM + Turso/libSQL

Drizzle ofrece consultas tipadas y parametrizadas. La aplicacion usa `drizzle-orm/libsql`, `@libsql/client` y tablas SQLite compatibles con Turso.

El esquema `collection_cards` almacena cartas guardadas por usuario mediante `user_id`. Ademas tiene un indice unico compuesto por `user_id` y `scryfall_id` para evitar duplicados por usuario.

Las migraciones Turso viven en `drizzle-turso/`. Las migraciones antiguas MySQL viven en `drizzle/` como historico de desarrollo local.

### better-auth

`better-auth` queda configurado como capa de autenticacion base.

La configuracion vive en:

- `src/lib/auth.ts`
- `src/lib/auth-client.ts`
- `src/app/api/auth/[...all]/route.ts`

Las tablas de auth viven en `src/db/schema.ts` y se sincronizan mediante Drizzle con Turso. La UI inicial vive en `/login`.

### Zod

Zod valida el payload de guardado en `/api/collection` antes de escribir en base de datos.

## Documentacion de uso de IA

El archivo `AI_LOG.md` registra que partes fueron generadas con ayuda de IA, que prompt se uso y que correcciones pidio despues el usuario. Ademas actualiza `README.md` al finalizar.
