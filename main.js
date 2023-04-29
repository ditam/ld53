
const WIDTH = 1200;
const HEIGHT = 700;

const PLAYER_SIZE = {
  X: 100,
  Y: 50
};

const PACKAGE_SIZE = 30;

const DROP_TIMEOUT = 1000;

const PLAYER_SPEED = 8;

let DEBUG = location && location.hostname==='localhost';

let ctx;

let yPosition = 0;

const playerImage = $('<img>').attr('src', 'assets/stork.png').get(0);
const player = {
  x: 600,
  y: 600
};

const bagImage = $('<img>').attr('src', 'assets/bag.png').get(0);

const keysPressed = {
  up:    false,
  right: false,
  down:  false,
  left:  false,
  space: false
};

// we start at -timeout to allow dropping immediately
let lastDrop = 0-DROP_TIMEOUT-1;
const packages = [];

function drawFrame(timestamp) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // update model state and positions
  if (keysPressed.up && player.y > 0) {
    player.y = Math.max(0, player.y - PLAYER_SPEED);
  }
  if (keysPressed.right && player.x < WIDTH) {
    player.x = Math.min(WIDTH, player.x + PLAYER_SPEED);
  }
  if (keysPressed.down && player.y < HEIGHT) {
    player.y = Math.min(HEIGHT, player.y + PLAYER_SPEED);
  }
  if (keysPressed.left && player.x > 0) {
    player.x = Math.max(0, player.x - PLAYER_SPEED);
  }

  // drop bags
  if (keysPressed.space && timestamp - lastDrop > DROP_TIMEOUT) {
    packages.push({
      x: player.x,
      y: player.y,
      dropTime: timestamp
    });
    lastDrop = timestamp;
  }

  // debug runner
  yPosition = (timestamp/10) % HEIGHT;
  ctx.save();
  ctx.fillStyle = '#00FF00';
  ctx.fillRect(WIDTH-100, yPosition, 20, 20);
  ctx.restore();

  // draw packages
  packages.forEach(package => {
    ctx.save();
    ctx.drawImage(bagImage, package.x, package.y, PACKAGE_SIZE, PACKAGE_SIZE);
    ctx.restore();
  });

  // draw player
  ctx.save();
  ctx.drawImage(playerImage, player.x-PLAYER_SIZE.X/2, player.y-PLAYER_SIZE.Y/2, PLAYER_SIZE.X, PLAYER_SIZE.Y);
  if (DEBUG) {
    ctx.save();
    ctx.fillStyle = '#dd2020';
    ctx.fillRect(player.x-2, player.y-2, 4, 4);
    ctx.restore();
  }
  ctx.restore();

  requestAnimationFrame(drawFrame);
}

$(document).ready(function() {
  console.log('Hello Delivery!');

  const canvas = document.getElementById('main-canvas');
  $(canvas).attr('height', HEIGHT);
  $(canvas).attr('width', WIDTH);

  ctx = canvas.getContext('2d');

  ctx.fillStyle = '#88DD88';
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 5;

  // keypress event listeners
  document.addEventListener('keydown', event => {
    switch(event.code) {
      case 'KeyW':
      case 'ArrowUp':
        keysPressed.up = true;
        break;
      case 'KeyD':
      case 'ArrowRight':
        keysPressed.right = true;
        break;
      case 'KeyS':
      case 'ArrowDown':
        keysPressed.down = true;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        keysPressed.left = true;
        break;
      case 'Space':
        keysPressed.space = true;
        break;
    }
    // the default behaviour might try to scroll or similar things
    event.preventDefault();
  });

  document.addEventListener('keyup', event => {
    switch(event.code) {
      case 'KeyW':
      case 'ArrowUp':
        keysPressed.up = false;
        break;
      case 'KeyD':
      case 'ArrowRight':
        keysPressed.right = false;
        break;
      case 'KeyS':
      case 'ArrowDown':
        keysPressed.down = false;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        keysPressed.left = false;
        break;
      case 'Space':
        keysPressed.space = false;
        break;
    }
  });

  // blast off
  drawFrame();
});
