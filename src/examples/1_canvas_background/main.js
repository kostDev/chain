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
const update = () => {};

game
  .init({ setup, update })
  .run();