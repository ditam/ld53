const levels = [{
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
    { x: 500, y: -1700 }
  ],
  enemies: [],
  end: 2000,
}, {
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
    { x: 600, y: -400, type: 'hunter', lastShot: 0 },
    { x: 100, y: -1800, type: 'hunter', lastShot: 0 },
    { x: 800, y: -1400, type: 'hunter', lastShot: 0 },
  ],
  end: 2500,
}, {
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
    { x: 750, y: -1400, type: 'helicopter', lastShot: 0 }
  ],
  end: 2500,
}, {
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
    { x: 100, y: -2100 },
    { x: 500, y: -2200 },
  ],
  enemies: [
    { x: 600, y: 200, type: 'hunter', lastShot: 0 },
    { x: 800, y: -300, type: 'helicopter', lastShot: 0 },
    { x: 750, y: -1400, type: 'flak', lastShot: 0 }
  ],
  end: 3000,
}, {
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
    { x: 800, y: -300, type: 'helicopter', lastShot: 0 },
    { x: 750, y: -460, type: 'helicopter', lastShot: 0 },
    { x: 750, y: -1200, type: 'flak', lastShot: 0 },
    { x: 950, y: -1230, type: 'hunter', lastShot: 0 },
    { x: 350, y: -1800, type: 'helicopter', lastShot: 0 },
    { x: 150, y: -2000, type: 'hunter', lastShot: 0 },
    { x: 300, y: -2200, type: 'flak', lastShot: 0 }
  ],
  end: 3500,
}];

levels.forEach(l => {
  console.assert(l.hasOwnProperty('targets'));
  console.assert(l.hasOwnProperty('enemies'));
  console.assert(l.hasOwnProperty('end'));
});
