
const WIDTH = 1200;
const HEIGHT = 700;

let ctx;

let yPosition = 0;

function drawFrame(timestamp) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  yPosition = (timestamp/10) % HEIGHT;
  ctx.fillRect(WIDTH-100, yPosition, 20, 20);

  requestAnimationFrame(drawFrame);
}

$(document).ready(function() {
  console.log('Hello Delivery!');

  const canvas = document.getElementById('main-canvas');
  $(canvas).attr('height', HEIGHT);
  $(canvas).attr('width', WIDTH);

  ctx = canvas.getContext('2d');

  ctx.fillStyle = '#00FF00';
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 5;

  drawFrame();
});
