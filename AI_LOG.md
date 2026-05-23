# AI Log

Este archivo registra el uso de IA dentro del proyecto para mantener trazabilidad sobre que se genero, que se pidio y que ajustes humanos se solicitaron despues.

## Como usar esta bitacora

- Anadir una fila cada vez que la IA genere o modifique una parte relevante del proyecto.
- Copiar el prompt de forma fiel o resumirlo solo si contiene datos sensibles.
- Registrar las correcciones posteriores del usuario, aunque sean pequenas.

| Fecha | Componente / Funcion | Prompt | Correcciones solicitadas |
| --- | --- | --- | --- |
| 2026-05-14 | Creacion del plan del proyecto, diseno de fases, `README.md` y `AI_LOG.md`; instalacion de dependencias necesarias y Three.js | - | - |
| 2026-05-17 | Estructura inicial `src/app`, `README.md`, `AI_LOG.md` | "crea los archivos de la estructura pero vacios, menos readme.md y ai_log.md esos crealos con normalidad" | Crear solo estructura vacia y documentacion util. |
| 2026-05-18 | Modal de vista previa 3D con Three.js en `/search` | "cuando clickes en una carta del resultado se atenue la pantalla y salga en el centro la carta ya con las funciones de threejs, estatica, que puedas girarla con el click pulsado del raton" | Usar modal sin URL propia; dejar foil para una iteracion posterior. |
| 2026-05-18 | Proxy local de imagenes para texturas 3D | Error en runtime al cargar imagenes remotas de Scryfall como textura Three.js | Servir texturas desde `/api/card-image` porque `cards.scryfall.io` no expone CORS para WebGL. |
| 2026-05-18 | Controles ampliados del visor 3D | "se pueda clicar en toda la superficie de la pantalla para girar la carta y poder usar la rueda del raton para hacer zoom en la carta" | Mover la camara con la rueda; trasladar la interaccion global al visor completo. |
| 2026-05-18 | Control de scroll del body al abrir/cerrar modal 3D | Modal 3D impedia hacer scroll en la lista de resultados subyacente | Anadir `document.body.style.overflow` en el modal; restaurar al cerrar. |
| 2026-05-18 | Shader foil sutil para rare y mythic | "para acabar fase 3, anadiremos el efecto foil a las cartas de rareza rare o superior" | Elegir efecto sutil y aplicarlo solo a rarezas `rare` y `mythic`. |
| 2026-05-23 | Fase 4: Drizzle + MySQL local WAMP | "configuraremos el .env y definiremos el esquema usando drizzle dejandolo sincronizado y preparado para migar a turso cuando sea necesario" | Detectar que WAMP acepta `root` sin contrasena; crear `.env.local`, `drizzle.config.ts`, `src/db/schema.ts`, `src/db/index.ts`, sincronizar `collection_cards` y documentar futuro Turso. |
| 2026-05-23 | Fase 5: better-auth + Drizzle | "empecemos con la fase 5, integremos betther-auth usando email y contraseña, creando un /login para acceder a la boveda" | Anadir `@better-auth/drizzle-adapter`, crear config server/client, ruta `/api/auth/[...all]`, tablas `user`, `session`, `account`, `verification`, migracion `0001_add_auth_tables` y sincronizacion en MySQL local. |
| 2026-05-23 | Visor ThreeJS en boveda | "la boveda tambien tiene que tener threejs tal como lo tiene en la busqueda" | Crear `CollectionGrid` cliente y reutilizar `CardPreviewModal` para abrir las cartas guardadas en el visor ThreeJS fullscreen. |
| 2026-05-23 | Navegacion dependiente de sesion | "en el /search si ya esta la sesion iniciada que solo salga Mi Boveda, si no esta iniciada que salga Login... en la pagina principal tambien" | Ajustar home y busqueda para mostrar `Mi Boveda` con sesion iniciada y `Login` cuando no hay sesion. |
| 2026-05-23 | Saludo y logout por sesion | "anadir a cada pagina donde crear conveniente un mensaje solo para los que tienen sesion iniciada" | Crear `SessionGreeting`, mostrar `Hola! nombre` y boton `Logout` solo con sesion en home, busqueda y boveda. |
| 2026-05-23 | Eliminacion de cartas guardadas | "vamos a anadir un pequeno boton para eliminar cartas guardadas en la boveda" | Anadir `DELETE /api/collection` protegido por sesion y boton `Eliminar` en cada carta de `CollectionGrid`; verificar guardado, borrado y listado real por HTTP. |
| 2026-05-24 | Integracion Turso y preparacion Vercel | "he actualizado env.local con las variables de turso, ayudame a integrarlo a subirlo a vercel" | Migrar runtime Drizzle de MySQL a Turso/libSQL, crear schema SQLite, generar `drizzle-turso/0000_init_turso_schema.sql`, aplicar esquema remoto, adaptar upsert SQLite, normalizar URL `libsql://`, verificar build y documentar variables Vercel. |
