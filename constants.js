
const ORIG_WIDTH = 1200;
const ORIG_HEIGHT = 700;
let WIDTH = ORIG_WIDTH;
let HEIGHT = ORIG_HEIGHT;

const PLAYER_SIZE = {
  X: 200,
  Y: 120
};

// used as padding for determining drawing of off-map objects
const OBJ_SIZE_MAX = 200;

const PACKAGE_SIZE = 50;
const PACKAGE_MIN_SIZE = 5;

const DROP_TIMEOUT = 1000;
const FALL_DURATION = 3000;

// increases every level
let PLAYER_SPEED = 6;

const HUNTER_RANGE = 250;
const HUNTER_TIMEOUT = 2000;
const HELICOPTER_TIMEOUT = 3000;
const HELICOPTER_FIRE_DURATION = 1500;
const HELICOPTER_HIT_RADIUS = 150;
const FLAK_INITIAL_TIMEOUT = 2000;
const FLAK_FIRE_TIMEOUT = 5000;
const FLAK_FRAGMENT_COUNT = 7;
const FLAK_HIT_RADIUS = 40;

const SCALING_STEP_MAX = 50;
const SCALING_DURATION = 6000;
const SCALE_TIMEOUT = 7000;

const DASH_STEP_SIZE = 20; // implicitly controls duration - takes shorter if there's no room to dash
const DASH_TIMEOUT = 3000;
const DASH_MAX_LENGTH = 450; // in px
const DASH_TRAIL_FADEOUT = 2500;
const DASH_DAMAGE_RADIUS = 100;

const EXPLOSION_VISIBLE_TIME = 700;

// if you want to dash again while an other trail is visible, we need to revisit the trail logic (singleton vars currently)
console.assert(DASH_TRAIL_FADEOUT < DASH_TIMEOUT);
