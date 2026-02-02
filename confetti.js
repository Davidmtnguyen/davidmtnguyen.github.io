// confetti.js
export class Confetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.running = false;
    this.spawnState = false;

    // Resize canvas to full window
    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Track mouse
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

    resetParticles() {
        this.particles.forEach(p => {
            p.vx = (Math.random() - 0.5) * 2;
            p.vy = 2 + Math.random() * 3;
            p.rotationSpeed = (Math.random() - 0.5) * 10;
        });
    }

  spawn(num = 5) {
    for (let i = 0; i < num; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 2,  // horizontal drift
        vy: 3 + Math.random() * 6,       // vertical speed
        size: 10 + Math.random() * 10,
        shape: this.randomShape(),
        color: this.randomColor(),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
  }

  randomShape() {
    const shapes = ["square", "circle", "heart"];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  randomColor() {
    const colors = ["#ff6b6b", "#feca57", "#54a0ff", "#5f27cd", "#1dd1a1"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  start() {
    if (this.running){
        if (this.spawnState){
            return
        }else{
            this.spawnState = true
        };
    };
    this.running = true;
    this.spawnState = true;
    // this.resetParticles();
    this.particles = [];
    requestAnimationFrame(() => this.loop());
  }

  stop() {
    this.spawnState = false;
    if (!this.running) return;
    setTimeout(() => {
        this.resetParticles();
        console.log("Stopped")
        this.running = false;
    }, 2500);
  }

  loop() {

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Spawn continuously
    if (this.spawnState) this.spawn(3);

    // Update particles
    if (!this.running) return;
    this.particles.forEach((p) => {
      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += (dx / dist) * 0.3;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      this.drawParticle(p);
    });

    // Remove offscreen particles
    this.particles = this.particles.filter(p => p.y < this.canvas.height + 20);

    requestAnimationFrame(() => this.loop());
  }

  drawParticle(p) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    switch (p.shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        break;
      case "heart":
        this.drawHeart(ctx, 0, 0, p.size);
        break;
    }

    ctx.restore();
  }

  drawHeart(ctx, x, y, size) {
    const topCurveHeight = size * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(
      x, y,
      x - size/2, y,
      x - size/2, y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x - size/2, y + (size + topCurveHeight)/2,
      x, y + (size + topCurveHeight)/2,
      x, y + size
    );
    ctx.bezierCurveTo(
      x, y + (size + topCurveHeight)/2,
      x + size/2, y + (size + topCurveHeight)/2,
      x + size/2, y + topCurveHeight
    );
    ctx.bezierCurveTo(
      x + size/2, y,
      x, y,
      x, y + topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
  }
}
