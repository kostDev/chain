# Chain.js - HTML5 Game Library

`in development`<br/>

Chain is free, open and ultra simple game library for work with Canvas in web browsers.
You can use this library for game development on JavaScript for Web.

### Import Engine
1. Add file in your project from `./src/js/lib/engine.js`
2. Use script type `module`: `<script type="module" src="./yourFile.js"></script>`
3. Import Engine:
 ```js
    import Engine from "./lib/engine.js"; 
 ```
### Use Chain.js in Project - Example:

```js
const game = new Engine('game-canvas', {
  // fps: 60, // default fps value
  width: 920,
  height: 630,
  // canvas background color
  // can be `false` if don't want to show bg color for canvas
  background: 'green',
  // game store
  store: {
    cellSize: 16, // px
  }
});
const store = game.store();
```
```js
// mouse events
game
  .mouseMove((mouseX, mouseY) => {})
  .mouseLeave((mouseX, mouseY) => {});
```

```js
// call befor game LOOP
const setup = () => {
  // here we setup some start logic 
  // call only once: example with using `game.store`
  console.log('cellSize', store.cellSize)
};
// all code will call in game LOOP
const update = () => {};
// activate & run our game
game
  .init({ setup, update })
  .run(); // run our game
```