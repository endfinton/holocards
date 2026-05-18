# AI Log

Este archivo registra el uso de IA dentro del proyecto para mantener trazabilidad sobre qué se generó, qué se pidió y qué ajustes humanos se solicitaron después.

## Cómo usar esta bitácora

- Añadir una fila cada vez que la IA genere o modifique una parte relevante del proyecto.
- Copiar el prompt de forma fiel o resumirlo solo si contiene datos sensibles.
- Registrar las correcciones posteriores del usuario, aunque sean pequeñas.

| Fecha | Componente / Función | Prompt | Correcciones solicitadas |
| --- | --- | --- | --- |
| 2026-05-14 | Creación del plan del proyecto, diseño de fases, `README.md` y `AI_LOG.md`; instalación de dependencias necesarias y Three.js | — | — |
| 2026-05-17 | Estructura inicial `src/app`, `README.md`, `AI_LOG.md` | “crea los archivos de la estructura pero vacios, menos readme.md y ai_log.md esos crealos con normalidad” | Crear solo estructura vacía y documentación útil. |
| 2026-05-18 | Modal de vista previa 3D con Three.js en `/search` | “cuando clickes en una carta del resultado se atenue la pantalla y salga en el centro la carta ya con las funciones de threejs, estatica, que puedas girarla con el click pulsado del raton” | Usar modal sin URL propia; dejar foil para una iteración posterior. |
| 2026-05-18 | Proxy local de imágenes para texturas 3D | Error en runtime al cargar imágenes remotas de Scryfall como textura Three.js | Servir texturas desde `/api/card-image` porque `cards.scryfall.io` no expone CORS para WebGL. |
| 2026-05-18 | Controles ampliados del visor 3D | “se pueda clicar en toda la superficie de la pantalla para girar la carta y poder usar la rueda del ratón para hacer zoom en la carta, el botón de cerrar para salir que sea más grande y esté casi en la esquina superior derecha” | Mover la cámara con la rueda; trasladar la interacción global al visor completo. |
| 2026-05-18 | Control de scroll del body al abrir/cerrar modal 3D | Modal 3D impedía hacer scroll en la lista de resultados subyacente | Añadir `document.body.style.overflow` en el modal; restaurar al cerrar. |
