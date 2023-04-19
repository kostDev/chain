# Chain.js - HTML5 Game Library

`in development`<br/>

Chain is free, open and ultra simple game library for work with Canvas in web browsers.
You can use this library for game development on JavaScript for Web.

### Import Engine
1. Add file in your project from `./src/js/lib/chain.js`
2. Use script type `module`: `<script type="module" src="./yourFile.js"></script>`
3. Import Engine:
 ```js
    import Chain from "./lib/chain.js"; 
 ```
### Use Chain.js in Project - Example:

```js
import Chain from "./lib/chain.js";

const params = {
  canvasId: 'game-canvas',
  bg: 'black',
  width: 800,
  height: 600,
}

new Chain(params)
  // setup all our data in game store
  .setup((store) => {
    store.x = 10;
    store.y1 = 10;
    store.y2 = 80;
    store.y3 = 150;
    store.size = 50
  }) // shapes draw on canvas
  .update((shapes, store) => {
    shapes
      .fill('white')
      .rect(store.x, store.y1, store.size, store.size)
      .fill('silver')
      .rect(store.x, store.y2, store.size, store.size)
      .fill('grey')
      .rect(store.x, store.y3, store.size, store.size);
  })
  .run();
```