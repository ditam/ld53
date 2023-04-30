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
    { x: 500, y: -1700 },
    { x: 300, y: -2000 },
    { x: 400, y: -2100 },
    { x: 500, y: -2200 },
  ],
  enemies: [
    { x: 600, y: 200, type: 'hunter', lastShot: 0 },
    { x: 800, y: -300, type: 'helicopter', lastShot: 0 },
    { x: 750, y: -400, type: 'helicopter', lastShot: 0 },
    { x: 1100, y: -300, type: 'hunter', lastShot: 0 },
    { x: 1000, y: -1500, type: 'flak', lastShot: 0 },
    { x: 100, y: -1800, type: 'hunter', lastShot: 0 },
  ]
}];

levels.forEach(l => {
  console.assert(l.hasOwnProperty('targets'));
  console.assert(l.hasOwnProperty('enemies'));
});
