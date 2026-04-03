# Celtic Sounds — Max for Live MIDI Instrument

A Max 9 / Max for Live MIDI Instrument device that brings eight Celtic instruments into Ableton Live with support for WARBL wind controller and standard keyboard input. The device features sampled Celtic instruments, real-time expression control, customizable drone accompaniment, and convolution reverb for authentic and expressive playback.

**Instruments:** Tin Whistle · Irish Flute · Uilleann Pipes · Anglo Concertina · Accordion · Highland Bagpipe · Smallpipes · Säckpipa

---

## Attribution

### Samples and Impulse Responses

All instrument samples and impulse response files used by this device are the work of **Michael Eskin** and are sourced from his **Celtic Sounds** web application:

> **Celtic Sounds** — https://michaeleskin.com/celtic-sounds/celtic-sounds.html

The samples cover eight traditional Irish and Scottish instruments recorded at chromatic-adjacent intervals across each instrument's playable range. The impulse responses (room, chamber, hall, and church) are used here for the device's convolution reverb.

This Max for Live device is an independent adaptation of Michael Eskin's original web-based tool. All audio content remains the work and property of Michael Eskin.

---

## Usage

### Getting the Samples

Samples and impulse responses are not included in this repository. After confirming the license with Michael Eskin, run the download script from the project root:

```bash
node scripts/download-samples.js
```

This will populate `samples/` and `impulses/` from `michaeleskin.com/celtic-sounds/`.

### Loading the Device

Open `celtic-sounds.maxpat` as a Max for Live MIDI Instrument in Ableton Live. The device requires Max 9 and a Max for Live license.

### Custom Instruments

Drop a folder containing an `instrument.json` manifest and `.mp3` sample files onto the device to load a custom instrument. See `custom/` for the manifest schema.

---

## Development

```bash
npm install
npm test        # runs 61 Jest tests against pure JS modules
```

JS files ending in `.max.js` are Max JS objects (ES5, no Node APIs). Pure logic modules in `js/` (no `.max.js` suffix) are tested with Jest.

---

## Third-Party Licenses

### JSZip

`js/jszip.min.js` is bundled from **JSZip v3.10.1**, used for custom instrument ZIP validation.

```
JSZip v3.10.1 - A JavaScript class for generating and reading zip files
http://stuartk.com/jszip

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3.
See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown

JSZip uses the library pako released under the MIT license:
https://github.com/nodeca/pako/blob/main/LICENSE
```

The MIT license text:

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
