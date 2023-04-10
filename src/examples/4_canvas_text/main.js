import Engine from "../../js/lib/engine.js";

const btn = document.getElementById('btn_add_days');

const game = new Engine({
  id: 'game-canvas',
  width: 640,
  height: 480,
  background: '#545454',
  store: {
    posX: 24, // px
    days: 1,
  }
});

const { store } = game;

// add event on mouse click
btn.onclick = () => {
  store.days++;
}


const setup = () => {
  console.log('Working!')
}
const update = () => {
  //params:   text, x, y, color, fontSize, font
  game.text('Text Default', store.posX, 24 );
  game.text('Text White', store.posX, 54, 'white' );
  game.text('Text Green 24px', store.posX, 92, 'green', 24);
  game.text('Lightblue 24px Arial', store.posX, 132, 'lightblue', 24, 'Arial');
  game.text('Black 32px Times New Roman', store.posX, 178, '#000000', 32, 'Times New Roman');
  game.text('Lime 36px sans-serif', store.posX, 224, 'lime', 36, 'sans-serif');
  game.text('Have a nice Day ☀️ ', store.posX, 320, 'gold', 44, 'monospace');
  // display text with variable from game store + btn click
  game.text(`Counting Days: ${store.days} `, store.posX, 400, 'white', 32, 'monospace');
};

game
  .init({ setup, update })
  .run();