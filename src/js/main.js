import Engine from "./lib/engine.js";

const game = new Engine('game-canvas', {
  width: 920,
  height: 630,
  bgColor: 'silver',
  store: {
    grid: []
  }
});

game.mouseLeave((mouseX, mouseY) => {
  store.mouseX = null;
  store.mouseY = null;
});
game.mouseMove((mouseX, mouseY) => {
  // console.log(mouseX, mouseY);
  store.mouseX = mouseX;
  store.mouseY = mouseY;
});

const store = game.store;

const setup = () => {
  const width = game.width;
  const height = game.height;
  const cellW = 16;
  const cellH = 16;
  const padding = 1;

  for(let y = 1, indexY = 0; y + cellH + padding <= height; y+= cellH + padding, indexY++) {
    store.grid.push([]);
    for(let x = 1; x + cellW + padding <= width; x+= cellW + padding) {
      store.grid[indexY].push({ x,y, w: cellW, h: cellH, color: 'purple' });
    }
  }

}

const update = () => {
  // game.circle(200,50, 25, 'purple');
  store.grid.forEach(row => {
    row.forEach(cell => {
      if(
        store.mouseX && store.mouseY &&
        cell.x <= store.mouseX && store.mouseX < cell.x + cell.w &&
        cell.y <= store.mouseY && store.mouseY < cell.y + cell.h
      ) {
        game.rect(
          cell.x, cell.y,
          cell.w, cell.h,
          'green'
        );
      } else {
        game.rect(
          cell.x, cell.y,
          cell.w, cell.h,
          cell.color
        );
      }

    })
  })
}

game
  .init({ setup, update })
  .run();
