const _ENGINE_PARAMS = {
  id: 'game-canvas',
  fps: 60,
  width: 720,
  height: 480,
  // canvas params
  background: 'silver',
  pixelated: true,   // default false
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
  // canvas default background
  this.background = params.background;
  this.stopRequestAnimation = null;
  this.fps = params.fps;
  this.time_step = 1000 / 60;
  this.last_time = null;
  this.total_time = 0;
  this.accumulated_lag = 0;

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
}

Engine.prototype.lerp = function (v1, v2, p) {
  return v1 * (1 - p) + v2 * p
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
// SHAPES -> circle