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
    store.fontSize = 42;
    store.text = 'Hello Chain'
  })
  .update((shapes, store) => {
    shapes
      .fillText('gold', store.fontSize)
      .text(store.text, store.x, store.y)
      .fillText('purple', store.fontSize - 8)
      .text(store.text, store.x, store.y + 48)
  })
  .run();
