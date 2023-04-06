import Engine from "../../js/lib/engine.js";

const game = new Engine({
  id: 'game-canvas',
  width: 640,
  height: 480,
  background: 'orange',
  store: {
    mouseX: 280,
    mouseY: 190,
  }
});

const { store, events } = game;

events
  .mouseMove((mouseX, mouseY) => {
    store.mouseX = mouseX;
    store.mouseY = mouseY;
  })
  .mouseLeave(() => {
    store.mouseX = null;
    store.mouseY = null;
  });

const setup = () => {
  console.log('Working!')
}
const update = () => {
  if(store.mouseX && store.mouseY) {
    game.rect(store.mouseX, store.mouseY, 50, 50, 'white');
  }
};

game
  .init({ setup, update })
  .run();