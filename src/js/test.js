import Chain from "./lib/chain.js";

const params = {
  canvasId: 'game-canvas',
  bg: 'black',
  width: 800,
  height: 600,
}

new Chain(params)
  .setup((store) => {
    store.x = 10;
    store.y1 = 10;
    store.y2 = 80;
    store.y3 = 150;
    store.size = 50
  })
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


