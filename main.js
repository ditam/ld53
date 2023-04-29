
const WIDTH = 1200;
const HEIGHT = 700;

const PLAYER_SIZE = {
  X: 100,
  Y: 50
};

// used as padding for determining drawing of off-map objects
const OBJ_SIZE_MAX = 200;

const PACKAGE_SIZE = 50;
const PACKAGE_MIN_SIZE = 5;

const DROP_TIMEOUT = 1000;
const FALL_DURATION = 3000;

const PLAYER_SPEED = 8;

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getRandomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let DEBUG = location && location.hostname==='localhost';

let ctx, debugLog;

let mapOffset = 0;
const mapObjects = [
  { x: 800, y: 500 },
  { x: 250, y: 400 },
  { x: 200, y: 200 },
  { x: 800, y: -100 },
  { x: 500, y: -200 },
  { x: 200, y: -400 },
  { x: 700, y: -700 },
  { x: 300, y: -1000 },
  { x: 500, y: -1200 },
  { x: 300, y: -1400 },
  { x: 500, y: -1700 },
  { x: 300, y: -2000 },
  { x: 400, y: -2100 },
  { x: 500, y: -2200 },
];

const mapDoodads = [];
(function generateRandomDoodads(){
  for (let i=0; i<100; i++) {
    mapDoodads.push({
      x: getRandomIntFromInterval(0, WIDTH),
      y: getRandomIntFromInterval(-3000, HEIGHT),
      type: getRandomItem(['grass1', 'grass2', 'bush'])
    });
  }
})();
const doodadType2Img = {
  grass1: $('<img>').attr('src', 'assets/grass1.png').get(0),
  grass2: $('<img>').attr('src', 'assets/grass2.png').get(0),
  bush: $('<img>').attr('src', 'assets/bush.png').get(0)
};

const playerImage = $('<img>').attr('src', 'assets/stork-sprites.png').get(0);
const player = {
  x: 600,
  y: 600
};

let playerScore = 0;

const packageImageBlue = $('<img>').attr('src', 'assets/package-blue.png').get(0);
const packageImagePink = $('<img>').attr('src', 'assets/package-pink.png').get(0);

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

let frameCount = 0;

function getSpriteOffset(currentFrame, objName) {
  console.assert(typeof currentFrame === 'number');
  console.assert(typeof objName === 'string');

  let spriteOffset = 0;
  if (objName = 'stork') {
    if (currentFrame%100 > 80) {
      spriteOffset = 100;
    }
    if (currentFrame%100 > 90) {
      spriteOffset = 200;
    }
  } else {
    console.assert(false, 'Unknown sprite object name: ' + objName);
  }

  return spriteOffset;
}

function drawFrame(timestamp) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // ##### Update phase #####
  // - TODO: extract and de-couple from drawing

  // scroll map
  mapOffset++;

  // move player
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

  // drop packages
  if (keysPressed.space && timestamp - lastDrop > DROP_TIMEOUT) {
    // TODO: after graphics are finalized, adjust package x/y to start from beak
    packages.push({
      x: player.x,
      y: player.y - mapOffset,
      type: Math.random() < 0.5 ? 'blue' : 'pink',
      dropTime: timestamp
    });
    lastDrop = timestamp;
  }

  // ##### Draw phase #####

  // draw map doodads (decorative only)
  mapDoodads.forEach(d => {
    if (
      (d.y + mapOffset + 32 > 0) // already in view
      &&
      (d.y + mapOffset < HEIGHT) // not yet scrolled out
    ) {
      ctx.drawImage(
        doodadType2Img[d.type], d.x, d.y + mapOffset, 32, 32);
    }
  });


  // draw map objects
  mapObjects.forEach(o => {
    if (
      (o.y + mapOffset + OBJ_SIZE_MAX > 0) // already in view
      &&
      (o.y + mapOffset < HEIGHT) // not yet scrolled out
    ) {
      ctx.save();
      ctx.fillStyle = '#994400';
      ctx.fillRect(o.x, o.y + mapOffset, 150, 70);
      ctx.restore();
    }
  });

  // draw packages
  packages.forEach(package => {
    // only draw packages in viewport
    if (package.y + mapOffset - PACKAGE_SIZE > HEIGHT) {
      return;
    }

    // age in (0, 1) interval
    const age = Math.min(FALL_DURATION, timestamp - package.dropTime) / FALL_DURATION;
    const size = Math.max(PACKAGE_MIN_SIZE, PACKAGE_SIZE * (1-age));
    ctx.drawImage(
      package.type === 'blue'? packageImageBlue : packageImagePink,
      package.x, package.y + mapOffset, size, size
    );

    if (age === 1 && !package.evaluated) {
      // calculate score
      package.evaluated = true;

      mapObjects.forEach(o => {
        if (
          o.x < package.x &&
          o.x + 150 > package.x &&
          o.y < package.y &&
          o.y + 70 > package.y
        ) {
          playerScore += 500;
          debugLog.text(playerScore);
        }
      });

      // TODO: visual indicator at landing
    }
  });

  // draw player
  ctx.save();
  ctx.drawImage(
    playerImage,
    getSpriteOffset(frameCount, 'stork'), 0, PLAYER_SIZE.X, PLAYER_SIZE.Y,
    player.x-PLAYER_SIZE.X/2, player.y-PLAYER_SIZE.Y/2, PLAYER_SIZE.X, PLAYER_SIZE.Y
  );
  if (DEBUG) {
    ctx.save();
    ctx.fillStyle = '#dd2020';
    ctx.fillRect(player.x-2, player.y-2, 4, 4);
    ctx.restore();
  }
  ctx.restore();

  frameCount++;
  requestAnimationFrame(drawFrame);
}

$(document).ready(function() {
  console.log('Hello Delivery!');

  const canvas = document.getElementById('main-canvas');
  $(canvas).attr('height', HEIGHT);
  $(canvas).attr('width', WIDTH);

  ctx = canvas.getContext('2d');

  debugLog = $(document.getElementById('debug-log'));
  debugLog.text(playerScore);

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
