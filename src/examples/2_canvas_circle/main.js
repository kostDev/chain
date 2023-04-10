import Engine from "../../js/lib/engine.js";

const game = new Engine({
  id: 'game-canvas',
  width: 640,
  height: 480,
  background: 'orange'
})

const setup = () => {
  console.log('Working!')
}
const update = () => {
  game.circle(320, 240, 48, 'white');
};

game
  .init({ setup, update })
  .run();