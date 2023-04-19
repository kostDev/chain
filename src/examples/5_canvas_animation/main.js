import Chain from "../../js/lib/chain.js";

const params = {
  canvasId: 'game-canvas',
  bg: 'black',
  width: 800,
  height: 600,
}

new Chain(params)
  .setup((store) => {
    store.x = 125;
    store.y = 75;
    store.r = 48;
    store.speed = 2.5;
    store.text = 'Hello Chain'
  })
  .update((shapes, store) => {
    shapes
      .fill('gold')
      .circle(store.x, store.y, store.r)

    if(store.x >= 640 + store.r * 2) {
      store.x = -store.speed + store.r
    } else {
      store.x += store.speed;
    }
  })
  .run();
