import Engine from "./lib/engine.js";

const game = new Engine({
  id: 'game-canvas',
  width: 920,
  height: 630,
  background: '#545454', //'whitesmoke',
  // pixelated: true,
  // game store
  store: {
    grid: [],
    padding: 1, // px
    cellSize: 16, //px
    cellColor: '#545454',
    activeCellColor: 'yellow',
    speedX: 4,
    speedY: 4,
  }
});

const { store, utils } = game;

const setup = () => {
  const [ sWidth, sHeight ] = utils.getCanvasSize();

  for(
    let y = 1, indexY = 0;
    y + store.cellSize + store.padding <= sHeight;
    y += store.cellSize + store.padding, indexY++
  ) {
    store.grid.push([]);
    for(
      let x = 1;
      x + store.cellSize + store.padding <= sWidth;
      x += store.cellSize + store.padding
    ) {
      store.grid[indexY].push({
        x,y,
        w: store.cellSize, h: store.cellSize,
        hovered: false,
      });
    }
  }
  // -------
  // , '\n', game
  // console.log(new Date().toLocaleString());
}

let cell = { x: 24, y: 24, r: 16 };

const update = () => {
  if( cell.x + cell.r + store.speedX > 920 ||
      cell.x - cell.r + store.speedX <= 0
  ) {
    store.speedX *= -1;
  }
  // console.log(game.fps, store.speedY * deltaTime)
  if( cell.y + cell.r + store.speedY > 630 ||
      cell.y - cell.r + store.speedY <= 0
  ) {
    store.speedY *= -1;
  }

  cell.x += store.speedX;
  cell.y += store.speedY;

  game.circle(cell.x, cell.y, cell.r, store.activeCellColor);
  // game.circle(200, 50, 25, 'purple');
  // game.point(100,100, 'yellow');
  // game.line(102,102,494, 102, 'blue');
  game.text('Testing Framerate', 340, 24, 'white', 20)
}

game
  .init({ setup, update })
  .run();
