
const ORIG_WIDTH = 1200;
const ORIG_HEIGHT = 700;
let WIDTH = ORIG_WIDTH;
let HEIGHT = ORIG_HEIGHT;

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
const HUNTER_RANGE = 250;
const HUNTER_TIMEOUT = 2000;
const HELICOPTER_TIMEOUT = 3000;
const HELICOPTER_FIRE_DURATION = 1500;
const HELICOPTER_HIT_RADIUS = 150;

const SCALING_STEP_MAX = 50;
const SCALING_DURATION = 5000;

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getRandomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let DEBUG = location && location.hostname==='localhost';

let ctx, debugLog;

let mapOffset = 0;
const targets = [
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

const enemies = [
  { x: 600, y: 200, type: 'hunter', lastShot: 0 },
  { x: 300, y: 100, type: 'helicopter', lastShot: 0 },
  { x: 1100, y: -200, type: 'hunter', lastShot: 0 },
  { x: 100, y: -1800, type: 'hunter', lastShot: 0 },
];
const enemyType2Img = {
  helicopter: $('<img>').attr('src', 'assets/helicopter.png').get(0),
  hunter: $('<img>').attr('src', 'assets/hunter.png').get(0),
};
// NB: range also determines the in-viewport checks
const enemyType2Range = {
  helicopter: 0,
  hunter: HUNTER_RANGE,
};
const enemyType2Size = {
  helicopter: 128,
  hunter: 32,
};

const mapDoodads = [];
(function generateRandomDoodads(){
  for (let i=0; i<100; i++) {
    mapDoodads.push({
      // to make the scale effect look nice, we generate doodads slightly off to the sides as well
      x: getRandomIntFromInterval(-400, WIDTH+400),
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

const cloud1Image = $('<img>').attr('src', 'assets/cloud1.png').get(0);
const cloud2Image = $('<img>').attr('src', 'assets/cloud2.png').get(0);

const rocketImage = $('<img>').attr('src', 'assets/rocket_sprite.png').get(0);
const playerImage = $('<img>').attr('src', 'assets/stork_sprite.png').get(0);
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
  if (objName === 'stork') {
    if (currentFrame%100 > 80) {
      spriteOffset = 100;
    }
    if (currentFrame%100 > 90) {
      spriteOffset = 200;
    }
  } else if (objName === 'rocket') {
    if (currentFrame%30 > 15) {
      spriteOffset = 64;
    }
  } else {
    console.assert(false, 'Unknown sprite object name: ' + objName);
  }

  return spriteOffset;
}

let scaling = false;
let scalingType = 'out';
let currentScale = 1.0;
let scalingSteps = 0;
let scalingTimer = null;

// used to increase the padding for the in-viewport checks while scaled
let scaledViewportAdjustment = 0;

function drawFrame(timestamp) {
  ctx.save();
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (scaling) {
    scaledViewportAdjustment = 1000;
    if (scalingType === 'out') {
      if (scalingSteps < SCALING_STEP_MAX) {
        scalingSteps++;
        currentScale -= 0.01;
      } else {
        if (!scalingTimer) {
          scalingTimer = setTimeout(() => {
            scalingTimer = null;
            scalingType = 'in';
          }, SCALING_DURATION);
        }
      }
    } else {
      if (scalingSteps > 0) {
        scalingSteps--;
        currentScale += 0.01;
      } else {
        scaling = false;
        scaledViewportAdjustment = 0;
        scalingType = 'out';
        console.log('scaling done:', scalingSteps, currentScale, WIDTH, HEIGHT);
      }
    }
    ctx.setTransform(currentScale, 0, 0, currentScale, 0, 0);
    ctx.translate(scalingSteps*8, scalingSteps*8);
    WIDTH = ORIG_WIDTH / currentScale;
    HEIGHT = ORIG_HEIGHT / currentScale;
  }

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
  if (keysPressed.space && timestamp - lastDrop > DROP_TIMEOUT && !scaling) {
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
      (d.y + mapOffset + 32 + scaledViewportAdjustment > 0) // already in view
      &&
      (d.y + mapOffset < HEIGHT) // not yet scrolled out
    ) {
      ctx.drawImage(doodadType2Img[d.type], d.x, d.y + mapOffset, 32, 32);
    }
  });

  // draw enemies
  enemies.forEach(e => {
    const size = enemyType2Size[e.type];
    const range = enemyType2Range[e.type];
    if (
      (e.y + mapOffset + size + range + scaledViewportAdjustment > 0) // already in view
      &&
      (e.y + mapOffset - size - range < HEIGHT) // not yet scrolled out
    ) {
      ctx.drawImage(enemyType2Img[e.type], e.x - size/2, e.y -size/2 + mapOffset, size, size);
      if (e.type === 'hunter') {
        // draw range
        ctx.beginPath();
        ctx.arc(e.x, e.y + mapOffset, HUNTER_RANGE, 0, 2 * Math.PI);
        ctx.stroke();

        // draw rifle - pointing at player
        let dX = player.x - e.x;
        let dY = player.y - (e.y + mapOffset);
        const dist = Math.sqrt(dX*dX + dY*dY);
        dX = dX / dist;
        dY = dY / dist;
        // (dX, dY is now the unit vector pointing towards the player)

        ctx.save();
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y + mapOffset);
          ctx.lineTo(e.x + dX * 30, e.y + mapOffset + dY * 30);
          ctx.stroke();
        ctx.restore();

        // check firing range
        if (dist < HUNTER_RANGE && timestamp - e.lastShot > HUNTER_TIMEOUT && !scaling) {
          e.lastShot = timestamp;
          console.log('shot by:', e);
        }
      } else if (e.type === 'helicopter') {
        if (!e.activated) {
          e.lastShot = timestamp;
          e.activated = true;
        } else if (timestamp - e.lastShot > HELICOPTER_TIMEOUT) {
          e.lastShot = timestamp;
          e.shooting = true;
          e.targetX = player.x;
          e.targetY = player.y;
        }

        if (e.shooting) {
          // progress in (0, 1) interval
          const shotProgress = Math.min(HELICOPTER_FIRE_DURATION, timestamp - e.lastShot) / HELICOPTER_FIRE_DURATION;

          let dX = e.targetX - e.x;
          let dY = e.targetY - (e.y + mapOffset);
          const dist = Math.sqrt(dX*dX + dY*dY);
          dX = dX / dist;
          dY = dY / dist;
          // (dX, dY is now the unit vector pointing towards the player)

          const curveOffset = Math.sin(Math.PI * shotProgress) * 100 * (e.x<WIDTH/2? -1 : 1);
          // TODO: rotate, if not exactly, at least 180 when shooting upwards
          ctx.drawImage(
            rocketImage,
            getSpriteOffset(frameCount, 'rocket'), 0, 64, 64,
            e.x + dX * shotProgress * dist + curveOffset, e.y + mapOffset + dY * shotProgress * dist, 32, 32
          );

          if (shotProgress === 1) {
            e.shooting = 0;
            // check hit radius (hit if target is still close to player)
            const targetToActualDist = Math.sqrt(
              (e.targetX - player.x)*(e.targetX - player.x) +
              (e.targetY - player.y)*(e.targetY - player.y)
            );
            if (targetToActualDist < HELICOPTER_HIT_RADIUS && !scaling) {
              console.log('heli hit player');
            }
          }
        }

        if (DEBUG) {
          ctx.save();
          ctx.fillStyle = '#dd20dd';
          ctx.fillRect(e.x-2, e.y + mapOffset -2, 4, 4);
          ctx.restore();
        }
      }
    }
  });

  // draw targets (TODO: appear as houses)
  targets.forEach(t => {
    if (
      (t.y + mapOffset + OBJ_SIZE_MAX + scaledViewportAdjustment > 0) // already in view
      &&
      (t.y + mapOffset < HEIGHT) // not yet scrolled out
    ) {
      ctx.save();
      ctx.fillStyle = '#994400';
      ctx.fillRect(t.x, t.y + mapOffset, 150, 70);
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

      targets.forEach(t => {
        // TODO: higher score for chimney hits?
        if (
          t.x < package.x &&
          t.x + 150 > package.x &&
          t.y < package.y &&
          t.y + 70 > package.y
        ) {
          playerScore += 500;
          debugLog.text(playerScore);
        }
      });

      // TODO: visual indicator at landing
    }
  });

  // draw player

  // -> this restores the context from before the beginning of this method,
  //    so if any transformation was applied, the player sprite is not affected.
  ctx.restore();

  if (scaling) {
    ctx.save();
    ctx.globalAlpha = scalingSteps * (1 / SCALING_STEP_MAX);
    ctx.drawImage(cloud1Image, 0, 0, WIDTH, HEIGHT);
    ctx.drawImage(cloud2Image, -200, -mapOffset % 600, WIDTH, HEIGHT*2);
    ctx.restore();
  }

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
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

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
  drawFrame(0);
});
