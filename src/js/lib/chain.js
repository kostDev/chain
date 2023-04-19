const STOPPED = Symbol.for("loop/stopped");
const PAUSED = Symbol.for("loop/paused");
const RUNNING = Symbol.for("loop/running");

class Chain {
  #_numberOfUpdates = 0;
  #store = {};
  constructor(options = {}) {
    const {
      canvasId,
      width = 480,
      height = 480,
      bg = '#545454',
      fps = 59.9,
    } = options;

    this.state = STOPPED;
    this.fps = fps;
    this.options = {
      step: 1000 / this.fps,
      maxUpdates: 300,
    };

    this.scale = window.devicePixelRatio;
    this.canvasBg = bg;
    this.width = width;
    this.height = height;

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.width = Math.floor(this.width * this.scale);
    this.canvas.height = Math.floor(this.height * this.scale);
    // Normalize coordinate system to use CSS pixels.
    this.ctx.scale(this.scale, this.scale);
    this.ctx.save();

    this.shapes = new Shapes(this.canvas, this.ctx, width, height);

    const self = this;
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        self.options.step = 1; // reduce frame rate to 1 fps
        console.log('work')
      } else {
        self.options.step = 1000 / self.fps; // restore default frame rate
      }
    });

    this.tick = this.tick.bind(this);
  }
  get isStopped() {
    return this.state === STOPPED;
  }
  get isPaused() {
    return this.state === PAUSED;
  }
  get isRunning() {
    return this.state === RUNNING;
  }
  setup(_setup) {
    _setup(this.#store);
    return this;
  }
  // draw(_draw) {
  //   this._render();
  // }
  update(_update) {
    // create render for looping
    this.render = () => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      // this.ctx.reset();
      // default background screen
      if(this.canvasBg) {
        this.shapes.fill(this.canvasBg);
        this.shapes.rect(0, 0, this.width, this.height);
      }
      _update(this.shapes, this.#store, this.options.step, this.timing.total)
    };
    return this;
  }
  use(_useCallback) {
    _useCallback(this);
    return this;
  }
  run() {
    if (this.isStopped) {
      this.state = RUNNING;

      const lag = 0;
      const delta = 0;
      const total = 0;
      const last = null;

      this.timing = { last, total, delta, lag };
      this.frame = requestAnimationFrame(this.tick);
    }
  }
  stop() {
    if (this.isRunning || this.isPaused) {
      this.state = STOPPED;
      cancelAnimationFrame(this.frame);
    }
  }
  pause() {
    if (this.isRunning) {
      this.state = PAUSED;
      cancelAnimationFrame(this.frame);
    }
  }
  resume() {
    if (this.isPaused) {
      this.state = RUNNING;
      this.frame = requestAnimationFrame(this.tick);
    }
  }
  tick(time) {
    if (this.timing.last === null) this.timing.last = time;
    this.timing.delta = time - this.timing.last;
    this.timing.total += this.timing.delta;
    this.timing.lag += this.timing.delta;
    this.timing.last = time;

    this.#_numberOfUpdates = 0;

    while (this.timing.lag >= this.options.step) {
      this.timing.lag -= this.options.step;
      this.render();
      this.#_numberOfUpdates++;
      if (this.#_numberOfUpdates >= this.options.maxUpdates) {
        this.onPanic();
        break;
      }
    }
    this.frame = requestAnimationFrame(this.tick);
  }
  onPanic() {
    this.timing.lag = 0;
  };
}

class Shapes {
  constructor(canvas, ctx, w, h) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = w;
    this.height = h;
  }

  fill(color = '#a92283') {
    this.ctx.fillStyle = color;
    return this;
  }
  text(
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
  point(
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
  line(
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
  rect(
    x = 0, y = 0,
    w = 32, h = 32,
  ) {
    this.ctx.fillRect(x, y, w, h);
    this.ctx.restore();

    return this;
  }
  circle = function (
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
}