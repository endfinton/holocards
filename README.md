# HoloCard Vault 3D

HoloCard Vault 3D es una plataforma web en construccion para buscar, visualizar y coleccionar cartas de **Magic: The Gathering**. El objetivo es combinar busqueda real con Scryfall, visor 3D con efecto foil, base de datos local con Drizzle, autenticacion y coleccion privada.

## Estado actual

Proyecto con **Fases 1, 2, 3, 4 y 5 completadas**.

Completado:

- Proyecto Next.js creado con TypeScript, Tailwind y ESLint.
- Estructura activa bajo `src/`.
- Busqueda real de cartas conectada a Scryfall.
- Pagina funcional disponible en `/search`.
- Resultados mostrados en una rejilla responsive con imagen, nombre y rareza.
- Contador de cartas encontradas en la busqueda.
- Visor 3D al pulsar una carta con imagen.
- Visor 3D a pantalla completa.
- Giro manual de la carta arrastrando desde cualquier punto del visor.
- Zoom con rueda del raton mediante camara 3D.
- Cierre del visor solo mediante boton `X` o tecla `Escape`.
- Scroll de la pagina bloqueado mientras el visor esta abierto.
- Proxy local `/api/card-image` para usar imagenes de Scryfall como texturas WebGL sin problemas de CORS.
- Efecto foil shader en cartas de rareza `rare` y `mythic`.
- Base de datos local MySQL configurada con Drizzle.
- Base `holocard_db` creada en WAMP MySQL.
- Esquema inicial `collection_cards` sincronizado en WAMP(local).
- Migracion Drizzle generada en `drizzle/0000_init_collection_cards.sql`.
- Preparacion documentada para migrar a Turso/libSQL mas adelante.
- Autenticacion base configurada con `better-auth` y adaptador Drizzle.
- Ruta API `/api/auth/[...all]` preparada para login, registro y sesiones.
- Tablas `user`, `session`, `account` y `verification` creadas en MySQL local.
- Migracion Drizzle generada en `drizzle/0001_add_auth_tables.sql`.
- Pagina `/login` creada con formulario alternable de entrar / crear cuenta.
- Home inicial reemplazada por una portada simple con enlaces a busqueda, boveda y login.
- Saludo de sesion `Hola! nombre` y boton `Logout` en home, busqueda y boveda.
- Ruta `/collection` creada y protegida por sesion.
- Cartas de la boveda abren el mismo visor ThreeJS que la busqueda.
- Endpoint `/api/collection` creado para listar y guardar cartas del usuario autenticado.
- Boton `Guardar en boveda` anadido a los resultados de busqueda.
- Boton pequeno `Eliminar` anadido a cada carta guardada en la boveda.
- Indice unico por usuario y carta en `collection_cards` para evitar duplicados.
- Migracion Drizzle generada en `drizzle/0002_collection_user_unique.sql`.

Pendiente:

- Mejorar estado de sesion visible en navegacion.
- CSS y pulido visual final.
- Despliegue en Vercel.

## Como ejecutar el proyecto

### Requisitos

- Node.js
- pnpm
- WAMP o XAMPP Server con MySQL activo

### Instalacion

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

### Compilacion

```bash
pnpm build
```

## Como interactuar con la aplicacion

### Busqueda de cartas

Abre:

```text
http://localhost:3000/search
```

Escribe el nombre de una carta y envia el formulario. La aplicacion consulta Scryfall y muestra una rejilla responsive de resultados con:

- imagen
- nombre
- rareza
- boton `Guardar en boveda`

Tambien muestra cuantas cartas se han encontrado en la respuesta actual.

Ejemplo:

```text
http://localhost:3000/search?q=ring
```

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

Abre:

```text
http://localhost:3000/login
```

Desde esa pantalla puedes:

- crear una cuenta con nombre, email y contrasena
- iniciar sesion con email y contrasena
- volver a inicio o ir a busqueda

Al completar correctamente el formulario, la aplicacion redirige a `/search`.

### Boveda / coleccion

Abre:

```text
http://localhost:3000/collection
```

Si no hay sesion activa, la aplicacion redirige a `/login`.

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

Tailwind queda instalado desde el inicio, aunque el pulido visual completo se reserva para una fase posterior.

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

Variables necesarias:

```env
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

### better-auth

`better-auth` queda configurado como capa de autenticacion base.

La configuracion vive en:

- `src/lib/auth.ts`
- `src/lib/auth-client.ts`
- `src/app/api/auth/[...all]/route.ts`

Las tablas de auth viven en `src/db/schema.ts` y se sincronizan mediante Drizzle con MySQL local. La UI inicial vive en `/login`.

### Zod

Zod valida el payload de guardado en `/api/collection` antes de escribir en base de datos.

## Deploy en Vercel

El proyecto queda preparado para Vercel. Hay que configurar estas variables en Project Settings > Environment Variables:

```env
TURSO_DATABASE_URL=libsql://database-celeste-notebook-vercel-icfg-tnzgwvj7klqa2gjtuyamhj6s.aws-us-east-1.turso.io
TURSO_AUTH_TOKEN=<token privado de Turso>
BETTER_AUTH_SECRET=<secreto privado>
BETTER_AUTH_URL=https://<dominio-final-de-vercel>
```

Notas:

- `TURSO_DATABASE_URL` puede estar en formato `libsql://`; la app lo normaliza internamente a `https://` para el cliente libSQL.
- `BETTER_AUTH_URL` debe apuntar al dominio final desplegado. Para preview, Vercel tambien expone `VERCEL_URL` y la app lo usa como fallback.
- No subir `.env.local` al repositorio.
- El esquema remoto ya fue aplicado con `drizzle-kit push --force`.

Comandos utiles si se usa Vercel CLI:

```bash
pnpm dlx vercel login
pnpm dlx vercel link
pnpm dlx vercel env add TURSO_DATABASE_URL production
pnpm dlx vercel env add TURSO_AUTH_TOKEN production
pnpm dlx vercel env add BETTER_AUTH_SECRET production
pnpm dlx vercel env add BETTER_AUTH_URL production
pnpm dlx vercel --prod
```

## Documentacion de uso de IA

El archivo `AI_LOG.md` registra que partes fueron generadas con ayuda de IA, que prompt se uso y que correcciones pidio despues el usuario. Ademas actualiza `README.md` al finalizar.
