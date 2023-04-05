import Engine from "./lib/engine.js";

const game = new Engine('game-canvas', {
  width: 920,
  height: 630,
  background: false,
  // game store
  store: {
    grid: [],
    cellColor: 'purple',
    activeCellColor: 'lightblue'
  }
});

game
  .mouseLeave((mouseX, mouseY) => {
    store.mouseX = null;
    store.mouseY = null;
  })
  .mouseMove((mouseX, mouseY) => {
    // console.log(mouseX, mouseY);
    store.mouseX = mouseX;
    store.mouseY = mouseY;
  });

const store = game.store;

const setup = () => {
  const [ sWidth, sHeight ] = game.getScreenSize();
  // px
  const size = 16 , padding = 1;

  for(let y = 1, indexY = 0; y + size + padding <= sHeight; y += size + padding, indexY++) {
    store.grid.push([]);
    for(let x = 1; x + size + padding <= sWidth; x += size + padding) {
      store.grid[indexY].push({
        x,y,
        w: size, h: size,
      });
    }
  }
  console.log(game);
}

// game.circle(200, 50, 25, 'purple');
const update = () => {
  let isCellHovered = false;

  store.grid.forEach(row => {
    row.forEach(cell => {
      // check position status
      isCellHovered = store.mouseX && store.mouseY &&
        cell.x <= store.mouseX && store.mouseX < cell.x + cell.w &&
        cell.y <= store.mouseY && store.mouseY < cell.y + cell.h;
      // draw rect
      game.rect(
        cell.x, cell.y,
        cell.w, cell.h,
        isCellHovered ? store.activeCellColor : store.cellColor
      );
    })
  })
}

game
  .init({ setup, update })
  .run();
