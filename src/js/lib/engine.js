const _ENGINE_PARAMS = {
  id: 'game-canvas',
  fps: 60,
  width: 720,
  height: 480,
  // canvas params
  background: 'silver',
  pixelated: false,   // default false
  lineSharped: false, // default false
  // game store
  store: {},
}
function Engine(params) {
  params = { ..._ENGINE_PARAMS, ...params }
  // engine Store
  this.store = { ..._ENGINE_PARAMS.store, ...params.store };
  // ------------
  this.canvas = document.getElementById(params.id);
  this.ctx = this.canvas.getContext('2d');
  // canvas settings
  // this.ctx.globalAlpha = 1.0;
  if(params.lineSharped) {
    this.ctx.lineCap = "sharp";
    this.ctx.lineJoin = "sharp";
  }
  // make canvas looks more pixelated :)
  if(params.pixelated) {
    this.canvas.style.imageRendering = 'pixelated';
  }
  // remove blue effect
  // this.ctx.imageSmoothingEnabled = true;
  // fix pixel density
  this.pixelRatio = window.devicePixelRatio;
  this.canvas.width = this.canvas.width * this.pixelRatio;
  this.canvas.height = this.canvas.height * this.pixelRatio;
  // Set the scale of the context
  this.ctx.scale(this.pixelRatio, this.pixelRatio);
  // save default ctx state of the canvas
  this.ctx.save();
  // ------------
  this.canvas.width = params.width;
  this.canvas.height = params.height;
  // ------------
  this.width = params.width;
  this.height = params.height;
  // ------------
  // canvas background
  this.background = params.background;
  this.fps = params.fps;
  this.frameStep = 1_000 / this.fps;
  this.lastTime = 0;

  const self = this;
  // Utils
  this.utils = {
    getCanvasRect: () => self.canvas.getBoundingClientRect(),
    getCanvasSize: () => [self.canvas.width, self.canvas.height],
  };

  // Events
  function mouseEvent(e, callback) {
    const rect = self.utils.getCanvasRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    callback(mouseX, mouseY);
  }

  this.events = {
    mouseLeave: (callback) => {
      self.canvas.onmouseleave = (e) => {
        mouseEvent(e, callback)
      };
      return this.events;
    },
    mouseMove: (callback) => {
      self.canvas.onmousemove = (e) => {
        mouseEvent(e, callback)
      };
      return this.events;
    }
  }

  // default Settings
  this.setBackgroundColor = function (colorName) {
    this.background = colorName;
  }
  this.setPixelated = function (pixelated = true) {
    this.canvas.style.imageRendering = pixelated ? 'pixelated' : 'initial';
  }
  this.setLineSharped = function (sharped) {
    if(sharped) {
      this.ctx.lineCap = "sharp";
      this.ctx.lineJoin = "sharp";
    } else {
      this.ctx.lineCap = "butt";
      this.ctx.lineJoin = "miterLimit";
    }
  }
}


// engine FLOW
Engine.prototype.setup = function () {}
Engine.prototype.update = function () {}
// main game function
Engine.prototype.init = function ({ setup, update }) {
  if(setup || update) {
    this.setup = setup;
    this.update = update;
    // call function setup
    this.setup();
    // add optimisation for frame rate
    // document.addEventListener("visibilitychange", function() {
    //   if (document.hidden) {
    //     self.fps = 1; // reduce frame rate to 1 fps
    //     console.log('work')
    //   } else {
    //     self.fps = 60; // restore default frame rate
    //   }
    // });
    // ------------------
    return this;
  }
}

// SHAPES -> text
Engine.prototype.text = function (
  text = 'Hello Dev',
  x = 0, y = 0,
  color = 'red',
  fontSize = 12,
  font  = 'monospace'
) {
  // set font Color
  this.ctx.fillStyle = color;
  // Set font and size
  this.ctx.font = `${fontSize}px ${font}`; //'30px Arial';
  this.ctx.fillText(text, x, y)
  // clear ctx
  this.ctx.restore();
}
// SHAPES -> point
Engine.prototype.point = function (
  x = 0, y = 0,
  color = 'red'
) {
  this.ctx.fillStyle = color;
  this.ctx.beginPath();
  this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
  this.ctx.fill();
  // clear ctx
  this.ctx.restore();
}
// SHAPES -> line
Engine.prototype.line = function (
  x1 = 0, y1 = 0,
  x2 = 10, y2 = 10,
  color = 'black',
  lineWidth = 2,
) {
  this.ctx.beginPath();    // begin the line
  this.ctx.moveTo(x1, y1);   // set the starting point
  this.ctx.lineTo(x2, y2);  // set the ending point
  // this.ctx.globalAlpha = 1.0;
  this.ctx.strokeStyle = color;
  this.ctx.lineWidth = lineWidth;
  this.ctx.stroke();  // draw the line
  // clear ctx
  this.ctx.restore();
}
// SHAPES -> rect
Engine.prototype.rect = function (
  x = 0, y = 0,
  w = 32, h = 32,
  color = 'red'
) {
  this.ctx.fillStyle = color;
  this.ctx.fillRect(x, y, w, h);
  // clear ctx
  this.ctx.restore();
}
// SHAPES -> circle
Engine.prototype.circle = function (
  x = 0, y = 0,
  radius = 32,
  color = 'red'
) {
  this.ctx.fillStyle = color;
  this.ctx.beginPath();
  this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
  this.ctx.fill();
  // clear ctx
  this.ctx.restore();
}

Engine.prototype.run = function () {
  const now = window.performance.now();
  const deltaTime = Math.max(0, (now - this.lastTime) / this.frameStep); //
  // Clear canvas
  this.ctx.clearRect(0, 0, this.width, this.height);
  // default background screen
  if(this.background) {
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  // Update game state
  this.update(+deltaTime.toFixed(2));
  // add
  //self.lastTime = currentTime;
  this.lastTime = now;
  window.requestAnimationFrame(this.run.bind(this));
}

export default Engine;