import Engine from "../../js/lib/engine.js";

const game = new Engine({
  id: 'game-canvas',
  width: 640,
  height: 480,
  background: 'black',
  pixelated: false,
  store: {
    // circle data
    circle: {
      x: 0,
      y: 240,
      r: 72,
    },
    speed: 2.8,
    pauseTime: 60
  }
});

const { store } = game;

const setup = () => {
  console.log('Working!')
}
const update = (deltaTime) => {
  // for rect width speed
  if(store.circle.x >= 640 + store.circle.r * 2) {
    store.circle.x = -store.pauseTime * deltaTime;
  } else {
    store.circle.x += store.speed * deltaTime;
  }

  // rect with speed
  game.circle(store.circle.x, store.circle.y, store.circle.r, 'gold');
};

game
  .init({ setup, update })
  .run();