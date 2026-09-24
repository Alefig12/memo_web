# Memo - App web

Prototipo no funcional de la app web de Memo, hecho en Angular para la entrega final del curso de UX.

Se puede navegar por todas las pantallas y los componentes responden, pero no hay backend y los cambios no se guardan al recargar.

## Pantallas

1. Iniciar sesión
2. Tablero: vacío, con la lista de memos al tocar un recuadro y con el detalle al tocar un memo
3. Mis Lugares: ver el lugar en el mapa, editarlo y confirmar antes de eliminarlo
4. Mi Historial: vacío y con los datos al elegir periodo y contacto

Flujo: Iniciar sesión → Tablero. Desde el menú lateral se pasa a Lugares e Historial, y el botón de salir vuelve a Iniciar sesión.

## Qué se puede hacer

- Tablero: tocar los recuadros para ver sus memos y tocar un memo para ver el detalle.
- Lugares: buscar, elegir un lugar, mover el mapa, cambiar el radio de la geocerca, editar el nombre, mover el marcador, guardar, cancelar y eliminar.
- Historial: elegir periodo y contacto, cambiar de pestaña y ver más memos.
- El menú lateral se puede cerrar y abrir.

## Tecnologías

- Angular 22.2.0
- Angular Material y CDK 22.2.0 (Material 3)

Los componentes son los de Angular Material (Material 3), el mismo kit que usamos en Figma, con los colores de nuestro scheme y la tipografía Baloo 2. El tema está en `src/styles.scss`.

## Cómo correrlo

```bash
npm install
npm start
```

Queda en http://localhost:4200.

Para generar la versión final:

```bash
npm run build
```

El mapa necesita internet para cargar.

## Pantalla

El diseño en Figma es de 1440 x 1024. Lo probamos en Chrome en pantallas de 1920 x 1080 y 1280 x 800. La página se ajusta al tamaño de la ventana, y en ventanas angostas el menú lateral se cierra solo.
