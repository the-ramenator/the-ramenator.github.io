import { Midi } from "https://esm.sh/@tonejs/midi";

//UI Stuff

const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("click", () => {
  document.getElementById("midi-upload").click(); // Triggers the file upload dialog
});

dropZone.addEventListener("drop", dropHandler);
window.addEventListener("drop", (e) => {
  if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
    e.preventDefault();
  }
});
dropZone.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  const file = fileItems[0];
  console.log(file);
  if (!file) return;
  e.preventDefault();
  if (file.type.startsWith("audio/mid")) {
    e.dataTransfer.dropEffect = "copy";
  } else {
    e.dataTransfer.dropEffect = "none";
  }
});

window.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (!dropZone.contains(e.target)) {
      e.dataTransfer.dropEffect = "none";
    }
  }
});

function dropHandler(ev) {
  ev.preventDefault();
  const files = [...ev.dataTransfer.items]
    .map((item) => item.getAsFile())
    .filter((file) => file);

  const file = files[0];
  if (!file) return;
  showGraphContent();
  setupCalculator();
  readMidi(file);
}

document.getElementById("uploadNewMidi").addEventListener("click", () => {
  fileInput.click();
});

const fileInput = document.getElementById("midi-upload");
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  showGraphContent();
  setupCalculator();
  readMidi(file);
});

function openModal(headerHTML, bodyHTML) {
  document.getElementById("modal-header-text").innerHTML = headerHTML;
  document.getElementById("modal-body").innerHTML = bodyHTML;

  document.getElementById("modal").style.display = "block";
}
document.getElementById("close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target == document.getElementById("modal")) {
    document.getElementById("modal").style.display = "none";
  }
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.getElementById("nav-help").addEventListener("click", () => {
  const headerHTML = `Help`;
  const bodyHTML = `

      <div class="modal-line">
  <h2 class="modal-subtitle">About</h2>
  </div>
  <p><b>MIDI-2-Desmos</b> is a lightweight web app that takes <code>.midi</code> files and transforms them into audible <b><u><a href="https://www.desmos.com/calculator">Desmos Graphing Calculator</a></u></b> graphs. 
  <br><br>
  If you have any suggestions or find any atrocious bugs, you can dm me on discord: <b>halfcookedramen (#7300)</b>
  </p>

    <div class="modal-line">
  <h2 class="modal-subtitle">Uploading</h2>
  </div>
  <p><b>Midi files</b> aren't like mp3s. It's less like actual audio and more like <b>instructions</b> for which instruments and how long/loud to play each note.
  <br><br>
  I recommend getting <code>.midi</code> files from <b><u><a href="https://musescore.com">musescore</a></u></b> if you're looking for a specific song.
  </p>


  <div class="modal-line">
  <h2 class="modal-subtitle">Playback</h2>
  </div>
  <p>Once the file is loaded and Desmos correctly renders the graph, you can hear it by <b>unmuting the graph in the top left corner</b> and pressing play on the very first expression (the <b>t slider</b>).
  <br><br>
  Note: <em>larger midi files (like </em>The Moldau<em> and </em>Rachmaninoff No. 2<em> may take a while to load. It should be fine if you wait long enough, although it might fry your PC if it's on the lower end.</em>
  </p>

          
  <div class="modal-line">
  <h2 class="modal-subtitle">Exporting</h2>
  </div>
  <p>To export your graph into desmos there's a few options.
  <br><br>
    <b>Bookmarklet: </b>
  <ol>
  <li>In the options menu to the left, drag the <code>Load Desmos JSON button</code> up to your browser's Bookmarks Bar. (If you can't see the bar, press <code>Ctrl + Shift + B</code> on Windows or <code>Cmd + Shift + B</code> on Mac).</li>
  <li>Copy the JSON data in the options menu</li>
  <li>Navigate to <b><u><a target="_blank" href="https://www.desmos.com/calculator">desmos.com</a></u></b></li>
  <li>While looking at the empty Desmos graph, click the Load Desmos JSON bookmark you just saved</li>
  <li>Paste your JSON graph data into the box that pops up and click OK.</li>
  </ol>

    <br><br>
    <b>Dev Tools: </b>
  <ol>
  <li>Copy the JSON data in the options menu to the left</li>
  <li>Navigate to <b><u><a target="_blank" href="https://www.desmos.com/calculator">desmos.com</a></u></b></li>
  <li>Press <code>Ctrl + Shift + I</code> (Windows) or <code>Cmd + Option + I</code> (Mac) to open the Developer Console.</li>
  <li>Next to the <code>Elements</code> tab on the right, click the <code>Console</code> tab</li>
  <li>Type and enter <code>allow pasting</code> if you haven't enabled it already</li>
  <li>Type <code>Calc.setState(</code> and paste your JSON data after the parentheses. Add a closing <code>)</code> and press <code>enter</code></li>
  </ol>

</p>
`;
  openModal(headerHTML, bodyHTML);
});

Object.values(document.getElementsByClassName("file-container")).forEach(
  (item) => {
    if (item.dataset.filepath) {
      item.addEventListener("click", async () => {
        try {
          const response = await fetch(item.dataset.filepath);
          const fileName = item.dataset.filepath.split("/").slice(1).join("/");

          const blob = await response.blob();

          const file = new File([blob], fileName, {
            type: "audio/midi",
          });

          const dt = new DataTransfer();
          dt.items.add(file);

          fileInput.files = dt.files;
          fileInput.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (e) {
          console.error(e);
        }
      });
    }
  },
);

//End UI

const elt = document.getElementById("calculator");

const calculator = Desmos.GraphingCalculator(elt, {
  // backgroundColor: "#0A0E14",
  // textColor: "#ffffff",
  // accentColor: "#00f0ff",
});
let originalAnimationPeriod = 0;
const colors = Array.from(
  { length: 100 },
  () =>
    `#${Math.floor(Math.random() * 0x1000000)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()}`,
);
let nextColorIndex = 0;
const freakyScaleNumber = 8.17579891564;
const getTime = (note) => note.time ?? note.ticks ?? 0;

function getColor() {
  return nextColorIndex >= colors.length ? "#000000" : colors[nextColorIndex++];
}

function copyGraphToClipboard() {
  if (!calculator) return;
  const state = calculator.getState();
  const stateString = JSON.stringify(state);
  navigator.clipboard
    .writeText(stateString)
    .then(() => {
      document.getElementById("copyBtn").innerHTML = "Copied!";
      setTimeout(() => {
        document.getElementById("copyBtn").innerHTML = "Copy JSON";
      }, 1000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

function downloadGraphFile() {
  if (!calculator) return;
  const state = calculator.getState();
  const stateString = JSON.stringify(state, null, 2);
  const blob = new Blob([stateString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "desmos-graph.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document
  .getElementById("copyBtn")
  .addEventListener("click", copyGraphToClipboard);
document
  .getElementById("downloadBtn")
  .addEventListener("click", downloadGraphFile);

document.getElementById("screenshotBtn").addEventListener("click", () => {
  if (!calculator) return;

  var fullSizeImage = calculator.screenshot();
  const link = document.createElement("a");
  link.href = fullSizeImage;
  link.download = "graph.png";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

const disableVisuals = document.getElementById("disableVisuals");
disableVisuals.addEventListener("change", () => {
  const currentState = calculator.getState();
  currentState.expressions.list.forEach((expr) => {
    if (expr.id && expr.id.startsWith("line_")) {
      if (disableVisuals.checked) {
        expr.hidden = true;
      } else {
        expr.hidden = false;
      }
    }
  });
  calculator.setState(currentState);
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function bindControl({
  input,
  range,
  min,
  max,
  defaultValue = min,
  allowExpandMax = false,
  update,
}) {
  function handle(newValue) {
    let value = parseFloat(newValue);

    if (Number.isNaN(value)) {
      value = defaultValue;
    }

    value = clamp(value, min, max);

    if (allowExpandMax) {
      const currentMax = parseFloat(range.max) || max;

      if (value > currentMax) {
        range.max = value;
        input.max = value;
      }
    }

    range.value = value;
    input.value = value;
    update(value);
  }

  range.addEventListener("input", (e) => handle(e.target.value));
  input.addEventListener("change", (e) => handle(e.target.value));

  return handle;
}

function updateExpression(id, latex) {
  if (!calculator || !elt) return;

  calculator.setExpression({ id, latex });
}

const handleOctaveChange = bindControl({
  input: document.getElementById("octave"),
  range: document.getElementById("octaveRange"),
  min: -4,
  max: 4,
  defaultValue: 0,
  update(value) {
    updateExpression("octave", `o_{ctave} = ${value}`);
  },
});

const handleBassBoost = bindControl({
  input: document.getElementById("bassboost"),
  range: document.getElementById("bassboostRange"),
  min: 0,
  max: 10,
  defaultValue: 0,
  update(value) {
    updateExpression("bassboost", `b_{oost} = ${value}`);
  },
});

const handleSpeedChange = bindControl({
  input: document.getElementById("currentSpeed"),
  range: document.getElementById("currentSpeedRange"),
  min: 1,
  max: 1000,
  defaultValue: 100,
  allowExpandMax: true,
  update(value) {
    if (!originalAnimationPeriod) return;

    calculator.controller.dispatch({
      id: "t",
      type: "set-slider-animationperiod",
      animationPeriod: originalAnimationPeriod / (value / 100),
    });
  },
});

function showGraphContent() {
  document.getElementById("nav-mode").innerHTML = "Upload";
  resizeGraph();

  const uploadContent = document.getElementsByClassName("upload-content");
  Object.values(uploadContent).forEach((item) => {
    item.style.display = "none";
  });

  const graphContent = document.getElementsByClassName("graph-content");
  Object.values(graphContent).forEach((item) => {
    item.style.display = "block";
  });
}

function showUploadContent() {
  document.getElementById("nav-mode").innerHTML = "Graph";

  if (calculator) {
    calculator.updateSettings({
      muted: true,
    });
  }

  const uploadContent = document.getElementsByClassName("upload-content");
  Object.values(uploadContent).forEach((item) => {
    item.style.display = "block";
  });

  const graphContent = document.getElementsByClassName("graph-content");
  Object.values(graphContent).forEach((item) => {
    item.style.display = "none";
  });
}

showUploadContent();

document.getElementById("nav-mode").addEventListener("click", () => {
  if (document.getElementById("nav-mode").innerHTML == "Graph") {
    showGraphContent();
  } else {
    showUploadContent();
  }
});

function getAllSavedMidis() {
  const catalog = JSON.parse(localStorage.getItem("midi_file_catalog")) || [];

  return catalog
    .map((fileName) => {
      const rawData = localStorage.getItem(fileName);
      return rawData ? JSON.parse(rawData) : null;
    })
    .filter(Boolean);
}

document.getElementById("recents-clear").addEventListener("click", () => {
  const savedFiles = getAllSavedMidis();
  savedFiles.forEach((file) => {
    localStorage.removeItem(file.name);
  });
  document.getElementById("recent-cards").innerHTML = "";
});

function formatTimeDifference(timestamp1, timestamp2) {
  const totalSeconds = Math.floor(Math.abs(timestamp1 - timestamp2) / 1000);
  const YEAR = 31536000;
  const MONTH = 2592000;
  const DAY = 86400;
  const HOUR = 3600;
  const MINUTE = 60;
  if (totalSeconds >= YEAR) {
    return Math.floor(totalSeconds / YEAR) + "y ago";
  }
  if (totalSeconds >= MONTH) {
    return Math.floor(totalSeconds / MONTH) + "mo ago";
  }
  if (totalSeconds >= DAY) {
    return Math.floor(totalSeconds / DAY) + "d ago";
  }
  if (totalSeconds >= HOUR) {
    return Math.floor(totalSeconds / HOUR) + "h ago";
  }
  if (totalSeconds >= MINUTE) {
    return Math.floor(totalSeconds / MINUTE) + "m ago";
  }
  return totalSeconds + "s ago";
}
function loadRecents() {
  const savedFiles = getAllSavedMidis();
  const cards = document.getElementById("recent-cards");

  cards.innerHTML = "";
  savedFiles.sort((a, b) => parseInt(b.lastOpened) - parseInt(a.lastOpened));

  savedFiles.forEach((file) => {
    const time = formatTimeDifference(Date.now(), parseInt(file.lastOpened));
    const card = document.createElement("div");
    card.classList.add("recent-card");

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-clock-rotate-left");

    const title = document.createElement("p");
    title.classList.add("recent-card-title");
    const fileName =
      file.name.length > 20 ? file.name.slice(0, 20 - 1) + "…" : file.name;

    title.innerText = fileName;

    const info = document.createElement("p");
    info.classList.add("recent-card-info");
    info.innerText = `${file.size} • ${time}`;

    card.append(icon);
    card.append(title);
    card.append(info);
    cards.append(card);

    card.addEventListener("click", async function () {
      const response = await fetch(file.source);
      const blob = await response.blob();
      const midiFile = new File([blob], file.name, { type: "audio/midi" });
      const dt = new DataTransfer();
      dt.items.add(midiFile);
      fileInput.files = dt.files;
      fileInput.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}
loadRecents();
function resizeGraph() {
  if (!elt || !calculator) return;
  const rect = document
    .getElementsByClassName("content")[0]
    .getBoundingClientRect();
  elt.style.width = rect.width + "px";
  elt.style.height = rect.height + "px";

  calculator.setMathBounds({
    left: -1,
    right: 1000,
    bottom: -1,
    top: 130, //highest midi note is 128
  });
}

function setupCalculator() {
  nextColorIndex = 0;
  calculator.setBlank();
  calculator.setExpression({
    id: `t`,
    latex: `t = 0`,
  });
}

async function readMidi(file) {
  const reader = new FileReader();

  reader.onload = async ({ target }) => {
    const maxLength = 17;
    const fileName =
      file.name.length > maxLength
        ? file.name.slice(0, maxLength - 1) + "…"
        : file.name;
    document.getElementById("options-subtitle").innerHTML =
      fileName + " • " + (file.size / 1024).toFixed(1) + "kb";

    try {
      const fileData = JSON.stringify({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + "kb",
        lastOpened: Date.now(),
        source: target.result,
        settings: {},
        colors: [],
      });

      localStorage.setItem(file.name, fileData);

      const catalog =
        JSON.parse(localStorage.getItem("midi_file_catalog")) || [];
      if (!catalog.includes(file.name)) {
        catalog.push(file.name);
        localStorage.setItem("midi_file_catalog", JSON.stringify(catalog));
      }
    } catch (e) {
      console.error("Storage limit exceeded", e);
    }

    const response = await fetch(target.result);
    const arrayBuffer = await response.arrayBuffer();
    const midi = new Midi(arrayBuffer);

    const groups = new Map();
    let totalNotes = 0;
    for (const track of midi.tracks) {
      if (!track.notes?.length) continue;

      totalNotes += track.notes.length;

      for (const note of track.notes) {
        // Note ON
        const start = note.ticks;
        if (!groups.has(start)) groups.set(start, []);
        const id = crypto.randomUUID();

        groups.get(start).push({
          type: "on",
          note,
          noteId: id,
          time: getTime(note),
        });
        // Note OFF
        const end = note.ticks + note.durationTicks;
        if (!groups.has(end)) groups.set(end, []);
        groups.get(end).push({
          type: "off",
          note,
          noteId: id,
          time: getTime(note) + note.duration,
        });
      }
    }

    document.getElementById("noteCount").innerText = totalNotes;

    const chords = [...groups.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, events]) => events);

    if (chords.length) createDesmosLines(chords);
  };

  reader.readAsDataURL(file);
}

function createDesmosLines(chords) {
  if (!calculator || !Array.isArray(chords) || chords.length === 0) return;

  const lines = [];
  let minDelta = Infinity;
  let lastTime = 0;

  for (let i = 0; i < chords.length; i += 1) {
    const chord = chords[i];
    if (!chord?.length) continue;

    const time = getTime(chord[0]);
    if (i > 0) {
      const previousTime = getTime(chords[i - 1][0]);
      const delta = time - previousTime;
      if (delta > 0 && delta < minDelta) minDelta = delta;
    }
    lastTime = time;
  }
  const timeScale = minDelta > 0 && minDelta < 0.5 ? 0.5 / minDelta : 1;
  const expressions = [];

  for (const chord of chords) {
    if (!chord?.length) continue;

    const assigned = new Array(lines.length).fill(false);

    // OFF events first
    chord.sort((a, b) => {
      if (a.type === b.type) return 0;
      return a.type === "off" ? -1 : 1;
    });

    for (const event of chord) {
      if (event.type === "off") {
        const note = event.note;

        for (const line of lines) {
          if (line.active && line.currentNoteId === event.noteId) {
            const cValue =
              1 +
              Math.round((event.time * timeScale + Number.EPSILON) * 1000) /
                1000;

            line.terms.push([-line.lastMidi, cValue]);
            line.gains.push([0, Math.round(cValue * 100) / 100]);
            line.pitches.push([line.lastMidi, cValue]);

            line.lastMidi = null;
            line.currentNoteId = null;
            line.active = false;

            break;
          }
        }

        continue;
      }

      const note = event.note;

      const activeOnEvents = chord.filter((e) => e.type === "on").length;

      while (lines.length < activeOnEvents) {
        lines.push({
          lastMidi: null,
          availableTime: -Infinity,
          terms: [],
          gains: [],
          pitches: [],
          active: false,
          currentNoteId: null,
        });
        assigned.length = lines.length;
        assigned.fill(false);
      }

      let bestIndex = -1;
      let bestDist = Infinity;

      const pitch = note.midi;

      for (let i = 0; i < lines.length; i++) {
        if (assigned[i]) continue;

        const line = lines[i];

        if (line.active) continue;

        let dist;

        if (line.lastMidi === null) dist = 10000;
        else dist = Math.abs(line.lastMidi - pitch);

        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      }

      if (bestIndex === -1) {
        bestIndex = lines.length;

        lines.push({
          lastMidi: null,
          availableTime: -Infinity,
          terms: [],
          gains: [],
          pitches: [],
          active: false,
          currentNoteId: null,
        });

        assigned.length = lines.length;
        assigned.fill(false);
      }

      const line = lines[bestIndex];

      const cValue =
        1 + Math.round((event.time * timeScale + Number.EPSILON) * 1000) / 1000;

      const bValue =
        line.lastMidi === null ? note.midi : note.midi - line.lastMidi;

      const velocity = note.velocity ?? 1;
      const frequency = freakyScaleNumber * Math.pow(2, (note.midi - 69) / 12);

      const maxGain = Math.min(10, 660 / frequency);

      const gain = +Math.min(maxGain, velocity).toFixed(2);
      line.terms.push([bValue, cValue]);
      line.gains.push([gain, cValue]);
      line.pitches.push([note.midi, cValue]);

      line.lastMidi = note.midi;
      line.availableTime = event.time + note.duration;
      line.active = true;
      line.currentNoteId = event.noteId;
      assigned[bestIndex] = true;
    }
  }
  for (const line of lines) {
    if (line.active) {
      const cValue = 1 + Math.round((lastTime * timeScale + 1) * 1000) / 1000;

      line.terms.push([-line.lastMidi, cValue]);
      line.terms.push([-line.lastMidi, cValue]);
      line.gains.push([0, cValue]);
      line.pitches.push([line.lastMidi, cValue]);
    }
  }
  const pickerContainer = document.getElementById("color-picker");
  const volumeSliders = document.getElementById("volume-sliders");

  for (let i = 0; i < lines.length; i += 1) {
    const bValues = lines[i].terms.map((x) => x[0]);
    const cValues = lines[i].terms.map((x) => x[1]);
    const gValues = lines[i].gains.map((x) => x[0]);
    const pValues = lines[i].pitches.map((x) => x[0]);

    const lineColor = getColor();

    //volume sliders
    const volumeContainer = document.createElement("div");
    volumeContainer.classList.add("volume-container");
    const label = document.createElement("label");
    label.innerText = i + 1;
    const volumeRange = document.createElement("input");
    volumeRange.setAttribute("type", "range");
    volumeRange.setAttribute("id", `volumeRange${i + 1}`);
    volumeRange.setAttribute("min", 0);
    volumeRange.setAttribute("max", 200);
    volumeRange.setAttribute("value", 100);

    const volumeText = document.createElement("input");
    volumeText.setAttribute("type", "number");
    volumeText.setAttribute("id", `volumeInput${i + 1}`);
    volumeText.setAttribute("min", 0);
    volumeText.setAttribute("max", 200);
    volumeText.setAttribute("value", 100);

    volumeRange.style.setProperty("--volumeLineColor", lineColor);

    volumeContainer.append(label);
    volumeContainer.append(volumeRange);
    volumeContainer.append(volumeText);

    const volumeDivider = document.createElement("div");
    volumeDivider.classList.add("volume-divider");

    volumeSliders.append(volumeContainer);
    if (i + 1 != lines.length) volumeSliders.append(volumeDivider);

    const volumeSlider = bindControl({
      input: volumeText,
      range: volumeRange,
      min: 0,
      max: 200,
      defaultValue: 100,
      update(value) {
        updateExpression(
          `volume${i + 1}`,
          `v_{olume${i + 1}} = ${value / 100}`,
        );
      },
    });

    //color pickers
    const picker = document.createElement("input");
    picker.setAttribute("type", "color");
    picker.dataset.line = i + 1;
    picker.value = lineColor;
    picker.addEventListener("change", () => {
      if (!calculator || !elt) return;
      volumeRange.style.setProperty("--volumeLineColor", picker.value);

      calculator.setExpression({
        id: `line_${i + 1}`,
        color: picker.value,
      });
    });
    pickerContainer.append(picker);

    expressions.push({
      id: `folder_line_${i + 1}`,
      type: "folder",
      title: `Line ${i + 1}`,
      collapsed: true,
      hidden: false,
    });

    expressions.push({
      id: `line_${i + 1}`,
      latex: `a_{${i + 1}}\\left(x\\right) = \\sum_{i=1}^{${cValues.length}}\\left\\{x\\ge c_{${i + 1}}\\left[i\\right]:b_{${i + 1}}\\left[i\\right],0\\right\\}`,
      color: lineColor,
      lineWidth: 1.5,
      lineStyle: "SOLID",
    });
    expressions.push({
      id: `volume${i + 1}`,
      latex: `v_{olume${i + 1}} = 1`,
    });
    expressions.push({
      id: `gain_${i + 1}`,
      // latex: `v_{${i + 1}}(x)=\\sum_{i=1}^{${cValues.length}}\\left\\{x\\ge c_{${i + 1}}\\left[i\\right]:g_{${i + 1}}\\left[i\\right],0\\right\\}`,
      latex: `v_{${i + 1}}(x)=\\sum_{i=1}^{${cValues.length}}\\left\\{x\\ge c_{${i + 1}}\\left[i\\right]:g_{${i + 1}}\\left[i\\right]\\left(0.1 + b_{oost} \\cdot \\max\\left(0,\\frac{60-p_{${i + 1}}\\left[i\\right]}{120}\\right)\\right),0\\right\\}`,
      hidden: true,
    });
    expressions.push({
      id: `b_list_${i + 1}`,
      latex: `b_{${i + 1}}=\\left[${bValues.join(",")}\\right]`,
    });
    expressions.push({
      id: `c_list_${i + 1}`,
      latex: `c_{${i + 1}}=\\left[${cValues.join(",")}\\right]`,
    });
    expressions.push({
      id: `g_list_${i + 1}`,
      latex: `g_{${i + 1}}=\\left[${gValues.join(",")}\\right]`,
    });
    expressions.push({
      id: `p_list_${i + 1}`,
      latex: `p_{${i + 1}}=\\left[${pValues.join(",")}\\right]`,
    });
    expressions.push({
      id: `line_case_${i + 1}`,
      latex: `d_{${i + 1}} = ${freakyScaleNumber}\\cdot2^{\\frac{12 \\cdot o_{ctave} + a_{${i + 1}} \\left(t\\right)}{12}}`,
    });
    expressions.push({
      id: `tone_${i + 1}`,
      // latex: `\\operatorname{tone}\\left(d_{${i + 1}}\\right)`,
      latex: `\\operatorname{tone}\\left(d_{${i + 1}}, v_{olume${i + 1}} \\cdot v_{${i + 1}}\\left(t\\right)\\right)`,
    });
  }
  calculator.setExpressions([
    {
      id: "settings",
      type: "folder",
      title: "Setup",
      collapsed: true,
      hidden: false,
    },
    /*    {
        id: "lines_folder",
        type: "folder",
        title: "Lines",
        collapsed: true,
        hidden: false,
      },
      {
        id: "tones_folder",
        type: "folder",
        title: "Tones",
        collapsed: true,
        hidden: false,
      },*/
    {
      id: `playbackLine`,
      latex: `x = t`,
      color: "#000000",
    },
    {
      id: `bassboost`,
      latex: `b_{oost} = 0`,
      sliderBounds: {
        min: 0,
        max: 5,
        step: "1",
      },
    },
    {
      id: `octave`,
      latex: `o_{ctave} = 0`,
      sliderBounds: {
        min: -3,
        max: 3,
        step: "1",
      },
    },
    {
      id: `timedisplay`,
      latex: `t_{imedisplay} = \\operatorname{round}\\left(\\frac{t}{${timeScale}},1\\right)`,
    },
    {
      id: `playbackPoint`,
      latex: `(t,0)`,
      color: "#000000",
      label: "${t_{imedisplay}} / " + lastTime.toFixed(1),
      showLabel: true,
    },
  ]);

  /*calculator.setExpression({
      id: "lines_folder",
      type: "folder",
      title: "Lines",
      collapsed: true,
      hidden: false,
    });

    calculator.setExpression({
      id: "tones_folder",
      type: "folder",
      title: "Tones",
      collapsed: true,
      hidden: false,
    });*/

  const settingIds = [
    "playbackLine",
    "timedisplay",
    "playbackPoint",
    "bassboost",
    "octave",
  ];

  const settingsState = calculator.getState();
  settingIds.forEach((id) => {
    const expr = settingsState.expressions.list.find((e) => e.id === id);

    if (!expr) {
      console.warn(`Expression not found: ${id}`);
      return; // Skip to the next ID if this one doesn't exist
    }

    expr.folderId = "settings";
    let settingsFolder = settingsState.expressions.list.find(
      (e) => e.id === "settings",
    );
    if (settingsFolder) {
      settingsFolder.collapsed = true;
    }
  });
  calculator.setState(settingsState);

  expressions.push({
    id: `t`,
    latex: `t = 0`,
    sliderBounds: {
      min: 0,
      max: Math.round(lastTime * timeScale) + 1,
      step: "0.1",
    },
    loopMode: "LOOP_FORWARD",
  });

  calculator.setExpressions(expressions);

  /*
    state = Calc.getState();
  state.expressions.list[0].slider.animationPeriod = 1430;
  Calc.setState(state);

    */

  const state = calculator.getState();

  for (let i = 0; i < lines.length; i += 1) {
    //folders
    const exprIds = [
      `line_${i + 1}`,
      `gain_${i + 1}`,
      `g_list_${i + 1}`,
      `b_list_${i + 1}`,
      `c_list_${i + 1}`,
      `p_list_${i + 1}`,
      `volume${i + 1}`,
      `line_case_${i + 1}`,
      `tone_${i + 1}`,
    ];
    let folderId = `folder_line_${i + 1}`;
    exprIds.forEach((exprId) => {
      const expr = state.expressions.list.find((e) => e.id === exprId);

      if (!expr) {
        console.warn(`Expression not found: ${exprId}`);
        return;
      }
      let folder = state.expressions.list.find((e) => e.id === folderId);
      if (folder) {
        folder.collapsed = true;
      }
      /*if (exprId === "line_" + (i + 1)) {
          folderId = "lines_folder";
          console.log(expr);
        } else if (exprId == `tone_${i + 1}`) {
          folderId = "tones_folder";
          console.log(expr);
        }*/
      expr.folderId = folderId;
    });
  }

  calculator.setState(state);
  originalAnimationPeriod = lastTime * 1000;

  calculator.controller.dispatch({
    id: "t",
    type: "set-slider-animationperiod",
    animationPeriod: originalAnimationPeriod,
  });

  calculator.controller.dispatch({
    id: "t",
    type: "set-slider-loopmode",
    loopMode: "LOOP_FORWARD", // Alternatives: LOOP_FORWARD_REVERSE, PLAY_ONCE, PLAY_FOREVER
  });
  calculator.setMathBounds({
    left: -1,
    right: Math.round(lastTime * timeScale) * 1.25,
    bottom: -1,
    top: 130, //highest midi note is 128
  });
}

const frameTimes = [];
let currentFps = 0;

let lastUpdate = 0;

function measureFPS() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (frameTimes.length > 0 && frameTimes[0] <= now - 1000) {
      frameTimes.shift();
    }
    frameTimes.push(now);
    currentFps = frameTimes.length;

    if (now - lastUpdate >= 500) {
      document.getElementById("fps").innerText = currentFps;
      lastUpdate = now;
    }
    measureFPS();
  });
}

window.addEventListener("resize", () => {
  resizeGraph();
});

window.addEventListener("load", () => {
  resizeGraph();
  measureFPS();
});
