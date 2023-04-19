import Chain from "../../js/lib/chain.js";

const params = {
  canvasId: 'game-canvas',
  bg: 'orange',
  width: 800,
  height: 600,
  fps: 20,
}

new Chain(params)
  .update(() => {
    // game loop here
  })
  .run();
