const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://michaeleskin.com/celtic-sounds/';
const REFERER = 'https://michaeleskin.com/celtic-sounds/celtic-sounds.html';

const NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function midiToFilename(midi) {
  const octave = Math.floor(midi / 12) - 1;
  return NOTE_NAMES[midi % 12] + octave;
}

// serverDir = path segment on michaeleskin.com; localDir = where we save (matches instrument-config.js sampleDir)
const INSTRUMENTS = {
  tin_whistle:      { range: [74, 98], step: 2, serverDir: 'tin_whistle',      localDir: 'tin_whistle' },
  irish_flute:      { range: [62, 86], step: 2, serverDir: 'irish_flute',      localDir: 'irish_flute' },
  uilleann_pipes:   { range: [50, 86], step: 2, serverDir: 'uilleann_pipes',   localDir: 'uilleann_pipes' },
  anglo_concertina: { range: [48, 84], step: 2, serverDir: 'anglo_concertina', localDir: 'anglo_concertina' },
  accordion:        { range: [36, 84], step: 2, serverDir: 'accordion',        localDir: 'accordion' },
  highland_bagpipe: { range: [57, 81], step: 2, serverDir: 'bagpipes',         localDir: 'highland_bagpipe' },
  smallpipes:       { range: [57, 81], step: 2, serverDir: 'smallpipes',       localDir: 'smallpipes' },
  sackpipa_d:       { range: [62, 86], step: 2, serverDir: 'sackpipa_d',       localDir: 'sackpipa' },
};

const IMPULSES = [
  'room1','room2','room3','chamber1','chamber2','chamber3',
  'hall1','hall2','hall3','church'
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    function get(currentUrl) {
      const req = https.get(currentUrl, {
        headers: {
          'Referer': REFERER,
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
      }, res => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return get(res.headers.location);
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
        file.on('error', err => {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          reject(err);
        });
      });
      req.on('error', err => {
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
    }
    get(url);
  });
}

async function main() {
  console.log('Downloading samples (license confirmed)...');
  for (const [id, config] of Object.entries(INSTRUMENTS)) {
    const dir = path.join('samples', config.localDir);
    fs.mkdirSync(dir, { recursive: true });
    for (let note = config.range[0]; note <= config.range[1]; note += config.step) {
      const filename = midiToFilename(note) + '.mp3';
      const url = `${BASE_URL}samples/${config.serverDir}/${filename}`;
      const dest = path.join(dir, filename);
      if (!fs.existsSync(dest)) await download(url, dest);
    }
    console.log(`  ✓ ${id}`);
  }
  fs.mkdirSync('impulses', { recursive: true });
  for (const name of IMPULSES) {
    const serverFile = name === 'church' ? 'church1.wav' : `${name}.wav`;
    const url = `${BASE_URL}impulses/${serverFile}`;
    const dest = path.join('impulses', `ir_${name}.wav`);
    if (!fs.existsSync(dest)) await download(url, dest);
  }
  console.log('Done.');
}
main();
