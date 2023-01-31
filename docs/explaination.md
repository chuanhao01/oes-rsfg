# On how the website works

`./index.html` &rarr; `./src/main.tsx` &rarr; `./src/App.tsx`

## `./index.html`

This is the entrypoint for vite.
It is set by default.

The html is what is served by the dev server, where the other scripts are checked and loaded dynamically.

## `./src/main.tsx`

This is the entrypoint for the 'main' react app.
All the react setup should be done here

## `./src/App.tsx`

This contains what should be rendered as the react 'app'.
