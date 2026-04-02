const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://michaeleskin.com/celtic-sounds/';

const INSTRUMENTS = {
  tin_whistle:      { range: [74, 98], step: 2 },
  irish_flute:      { range: [62, 86], step: 2 },
  uilleann_pipes:   { range: [50, 86], step: 2 },
  anglo_concertina: { range: [48, 84], step: 2 },
  accordion:        { range: [36, 84], step: 2 },
  highland_bagpipe: { range: [57, 81], step: 2 },
  smallpipes:       { range: [57, 81], step: 2 },
  sackpipa_d:       { range: [62, 86], step: 2 },
};

const IMPULSES = [
  'room1','room2','room3','chamber1','chamber2','chamber3',
  'hall1','hall2','hall3','church'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading samples (license confirmed)...');
  for (const [id, config] of Object.entries(INSTRUMENTS)) {
    const dir = path.join('samples', id);
    fs.mkdirSync(dir, { recursive: true });
    for (let note = config.range[0]; note <= config.range[1]; note++) {
      const url = `${BASE_URL}samples/${id}/${note}.mp3`;
      const dest = path.join(dir, `${note}.mp3`);
      if (!fs.existsSync(dest)) await download(url, dest);
    }
    console.log(`  ✓ ${id}`);
  }
  for (const name of IMPULSES) {
    const url = `${BASE_URL}impulses/${name}.wav`;
    const dest = path.join('impulses', `ir_${name}.wav`);
    if (!fs.existsSync(dest)) await download(url, dest);
  }
  console.log('Done.');
}
main();
