export class RainAnimation {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.drops = [];
    this.animationFrameId = null;
  }

  addTo(map) {
    this.map = map;
    this.canvas.width = map.getCanvas().width;
    this.canvas.height = map.getCanvas().height;
    map.getCanvasContainer().appendChild(this.canvas);
    this.startAnimation();
  }

  startAnimation() {
    this.createDrops();
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  createDrops() {
    for (let i = 0; i < 5000; i++) {
      this.drops.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        length: Math.random() * 20 ,
        opacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 3 + 2
      });
    }
  }

  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.strokeStyle = 'rgba(174,194,224,0.5)';
    this.context.lineWidth = 1;
    this.context.lineCap = 'round';

    for (let drop of this.drops) {
      this.context.beginPath();
      this.context.moveTo(drop.x, drop.y);
      this.context.lineTo(drop.x, drop.y + drop.length);
      this.context.stroke();
      drop.y += 4;

      if (drop.y > this.canvas.height) {
        drop.y = -drop.length;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  remove() {
    cancelAnimationFrame(this.animationFrameId);
    this.map.getCanvasContainer().removeChild(this.canvas);
  }
}
