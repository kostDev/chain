const options = {
  canvasId: 'game-canvas',
  bg: '#fff',
  width: 800,
  height: 600,
  fps: 20,
}

new Chain(options)
  .setup((store) => {
    store.x = 10;
    store.size = 50
  })
  .update((shapes, store) => {
    shapes
      .fill('black')
      .rect(store.x, shapes.height/2 - 130, store.size, store.size)
      .fill('grey')
      .rect(store.x, shapes.height/2 - 75, store.size, store.size)
      .fill('silver')
      .rect(store.x, shapes.height/2 - 20, store.size, store.size);
  })
  .run();


