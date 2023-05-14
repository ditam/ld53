let levels = [{ // currentLevel = 0
  targets: [
    { x: 800, y: 500 },
    { x: 250, y: 400 },
    { x: 200, y: 200 },
    { x: 800, y: -100 },
    { x: 500, y: -200 },
    { x: 200, y: -400 },
    { x: 700, y: -700 },
    { x: 300, y: -850 },
  ],
  enemies: [],
  end: 1200,
}, { // currentLevel = 1
  targets: [
    { x: 250, y: 400 },
    { x: 800, y: 350 },
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
  ],
  enemies: [
    { x: 330, y: 0, type: 'hunter', lastShot: 0 },
    { x: 600, y: -500, type: 'hunter', lastShot: 0 },
    { x: 900, y: -700, type: 'hunter', lastShot: 0 },
    { x: 800, y: -1400, type: 'hunter', lastShot: 0 },
    { x: 220, y: -1650, type: 'hunter', lastShot: 0 },
    { x: 280, y: -1820, type: 'hunter', lastShot: 0 },
  ],
  end: 2400,
}, { // currentLevel = 2
  targets: [
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
  ],
  enemies: [
    { x: 600, y: 200, type: 'hunter', lastShot: 0 },
    { x: 800, y: -300, type: 'helicopter', lastShot: 0 },
    { x: 150, y: -900, type: 'helicopter', lastShot: 0 },
    { x: 200, y: -1000, type: 'hunter', lastShot: 0 },
    { x: 750, y: -1400, type: 'helicopter', lastShot: 0 },
    { x: 250, y: -1500, type: 'hunter', lastShot: 0 },
    { x: 750, y: -1800, type: 'helicopter', lastShot: 0 },
    { x: 550, y: -1840, type: 'hunter', lastShot: 0 },
    { x: 900, y: -1950, type: 'hunter', lastShot: 0 },
  ],
  end: 2500,
}, { // currentLevel = 3
  targets: [
    { x: 800, y: 500 },
    { x: 250, y: 400 },
    { x: 900, y: 200 },
    { x: 800, y: -100 },
    { x: 500, y: -200 },
    { x: 200, y: -400 },
    { x: 700, y: -700 },
    { x: 300, y: -1000 },
    { x: 500, y: -1200 },
    { x: 300, y: -1400 },
    { x: 500, y: -1700 },
    { x: 300, y: -2000 },
    { x: 100, y: -2100 },
    { x: 500, y: -2200 },
  ],
  enemies: [
    { x: 600, y: 200, type: 'hunter', lastShot: 0 },
    { x: 250, y: -100, type: 'flak', lastShot: 0 },
    { x: 800, y: -300, type: 'helicopter', lastShot: 0 },
    { x: 200, y: -800, type: 'helicopter', lastShot: 0 },
    { x: 350, y: -900, type: 'helicopter', lastShot: 0 },
    { x: 750, y: -1200, type: 'hunter', lastShot: 0 },
    { x: 620, y: -1250, type: 'hunter', lastShot: 0 },
    { x: 800, y: -1600, type: 'helicopter', lastShot: 0 },
    { x: 550, y: -1800, type: 'flak', lastShot: 0 },
    { x: 100, y: -2000, type: 'hunter', lastShot: 0 },
  ],
  end: 2700,
}, { // currentLevel = 4
  targets: [
    { x: 500, y: 500 },
    { x: 250, y: 400 },
    { x: 500, y: 200 },
    { x: 900, y: -100 },
    { x: 500, y: -200 },
    { x: 100, y: -400 },
    { x: 700, y: -700 },
    { x: 1100, y: -1000 },
    { x: 500, y: -1200 },
    { x: 360, y: -1400 },
    { x: 500, y: -1700 },
    { x: 350, y: -1850 },
    { x: 450, y: -2100 },
    { x: 900, y: -2500 },
  ],
  enemies: [
    { x: 600, y: 200, type: 'hunter', lastShot: 0 },
    { x: 200, y: 230, type: 'hunter', lastShot: 0 },
    { x: 700, y: 0, type: 'helicopter', lastShot: 0 },
    { x: 750, y: 150, type: 'helicopter', lastShot: 0 },
    { x: 800, y: -300, type: 'helicopter', lastShot: 0 },
    { x: 750, y: -460, type: 'helicopter', lastShot: 0 },
    { x: 100, y: -700, type: 'helicopter', lastShot: 0 },
    { x: 300, y: -750, type: 'hunter', lastShot: 0 },
    { x: 500, y: -850, type: 'hunter', lastShot: 0 },
    { x: 500, y: -1000, type: 'flak', lastShot: 0 },
    { x: 200, y: -1200, type: 'helicopter', lastShot: 0 },
    { x: 950, y: -1230, type: 'hunter', lastShot: 0 },
    { x: 350, y: -1800, type: 'helicopter', lastShot: 0 },
    { x: 150, y: -2000, type: 'hunter', lastShot: 0 },
    { x: 300, y: -2200, type: 'flak', lastShot: 0 },
    { x: 120, y: -2800, type: 'helicopter', lastShot: 0 },
    { x: 300, y: -2800, type: 'helicopter', lastShot: 0 },
    { x: 500, y: -2800, type: 'hunter', lastShot: 0 },
    { x: 700, y: -2700, type: 'helicopter', lastShot: 0 },
    { x: 720, y: -2850, type: 'helicopter', lastShot: 0 },
  ],
  end: 3500,
}];

levels.forEach(l => {
  console.assert(l.hasOwnProperty('targets'));
  console.assert(l.hasOwnProperty('enemies'));
  console.assert(l.hasOwnProperty('end'));
});

function deepCopy(o) {
  return JSON.parse(JSON.stringify(o));
}

const levelsOriginal = deepCopy(levels);

function resetLevels() {
  levels = deepCopy(levelsOriginal);
}
