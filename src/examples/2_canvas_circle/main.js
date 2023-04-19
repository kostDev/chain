import Chain from "../../js/lib/chain.js";

const params = {
  canvasId: 'game-canvas',
  bg: 'grey',
  width: 800,
  height: 600,
}

new Chain(params)
  .setup((store) => {
    store.x = 150;
    store.y = 150;
    store.r = 50
  })
  .update((shapes, store) => {
    shapes
      .fill('black')
      .circle(store.x, store.y, store.r)
  })
  .run();


