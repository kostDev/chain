const _params = {
  width: 720,
  height: 480,
  bgColor: 'silver',
  store: {},
}
function Engine(canvasId = 'game-canvas', params = _params) {
  this.store = params.store;

  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');
  // console.log(this.ctx);
  this.canvas.width = params.width;
  this.canvas.height = params.height;

  this.width = params.width;
  this.height = params.height;


  this.fps = 60;
  this.background = params.bgColor;

  const self = this;

  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      self.fps = 1; // reduce frame rate to 1 fps
    } else {
      self.fps = 60; // restore default frame rate
    }
  });

  this.run = function () {
    // Clear canvas
    self.ctx.clearRect(0, 0, self.width, self.height);
    // default bg screen
    if(self.background) {
      self.ctx.fillStyle = self.background;
      self.ctx.fillRect(0, 0, self.width, self.height);
    }

    // Update game state
    self.update();
    // Request next frame
    setTimeout(function() {
      requestAnimationFrame(self.run);
    }, 1000 / self.fps);
  }
}

Engine.prototype.setBackgroundColor = function (colorName) {
  this.backgroundColor = colorName;
}
// engine FLOW
Engine.prototype.setup = function () {}
Engine.prototype.update = function () {}
// main game function
Engine.prototype.init = function (flow = { setup: null, update: null }) {
  if(flow.setup && flow.update) {
    this.setup = flow.setup;
    this.update = flow.update;
    // call function setup
    this.setup();
    // ------------------
    return this;
  } else {
    throw('You forget to add setup or update functions:' + JSON.stringify(Object.keys(flow)));
  }
}

// Shapes
// Rect
Engine.prototype.rect = function (
  x = 0, y = 0,
  w = 32, h = 32,
  color = 'red'
) {
  // this.shape.save({ type: 'rect', x, y, w, h, color });
  this.ctx.fillStyle = color;
  this.ctx.fillRect(x, y, w, h);
}

Engine.prototype.circle = function (
  x = 0, y = 0,
  radius = 32,
  color = 'red'
) {
  // this.shape.save({ type: 'circle', x, y, radius, color });

  this.ctx.fillStyle = color;

  this.ctx.beginPath();
  this.ctx.arc(x, 75, radius, 0, 2 * Math.PI);
  this.ctx.fill();
}

// Engine.prototype.mouseEnter = mouseEvent;

Engine.prototype.mouseMove = function (callback) {
  const rect = this.canvas.getBoundingClientRect();

  this.canvas.onmousemove = (e) => {
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    callback(mouseX, mouseY);
  }
}
Engine.prototype.mouseLeave = function (callback) {
  const rect = this.canvas.getBoundingClientRect();

  this.canvas.onmouseleave = (e) => {
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    callback(mouseX, mouseY);
  }
}


export default Engine;