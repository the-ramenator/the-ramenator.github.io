//fix the id change when deleting frames
//add eraser and fill tools
//change width of framebar on fullClear
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let restore_array = [];
let start_index = -1;
let stroke_color = 'black';
let stroke_width = "5";
let is_drawing = false;
let frames = [];
let counter;
function onStart() {
  ctx.canvas.width = (window.innerWidth / 100) * 90;
  ctx.canvas.height = (window.innerHeight / 100) * 76;
  canvas.style.top = '4vh';
  canvas.style.right = '0px';
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  counter = 0;
  if (localStorage.getItem('frames')) {
    frames = JSON.parse(localStorage.getItem('frames'));
    if (frames.length == 0) { }
    else {
      counter = frames.length;
      for (let i = 0; i < frames.length; i++) {
        document.getElementById('frames').innerHTML += '<div class="frame"><img src="' + frames[i] + '" id="frame' + (i + 1) + '" class="frameImg" onclick="editFrame(this.src, this.id)"><span class="frameSpan" id="num' + (i + 1) + '">' + (i + 1) + '</span></div>';
        document.getElementById('frameCount').innerHTML = frames.length;
      }
      document.getElementById('frame' + (frames.length)).scrollIntoView();
      document.getElementById('frames').style.width = ((frames.length + 1) * 8) + 'vw';
    }
  }
  if (localStorage.getItem('canvas')) {
    var src = localStorage.getItem('canvas');
    const img = new Image()
    img.src = src
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
    }
  }
}
function change_color(element) {
  stroke_color = element.style.background;
}

function change_width(element) {
  stroke_width = element.innerHTML
}

function start(event) {
  is_drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    ctx.lineTo(getX(event), getY(event));
    ctx.strokeStyle = stroke_color;
    ctx.lineWidth = stroke_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    ctx.stroke();
    ctx.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
  localStorage.removeItem('canvas');
  localStorage.setItem('canvas', canvas.toDataURL('image/webp', 0.85));
}

function getX(event) {
  if (event.pageX == undefined) { return event.targetTouches[0].pageX - canvas.offsetLeft }
  else { return event.pageX - canvas.offsetLeft }
}


function getY(event) {
  if (event.pageY == undefined) {
    return event.targetTouches[0].pageY - canvas.offsetTop
  }
  else {
    return event.pageY - canvas.offsetTop
  }
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if (event.type != 'mouseout') {
      ctx.putImageData(restore_array[start_index], 0, 0);
      localStorage.removeItem('canvas');
      localStorage.setItem('canvas', canvas.toDataURL('image/webp', 0.85));

    }
  }
}

function Clear() {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  restore_array = [];
  start_index = -1;
  localStorage.removeItem('canvas');
  localStorage.setItem('canvas', canvas.toDataURL('image/webp', 0.85));

}

function drawFrame() {
  counter += 1;
  document.getElementById('frames').innerHTML += '<div class="frame"><img src="' + canvas.toDataURL('image/webp', 0.85) + '" id="frame' + counter + '" class="frameImg"  onclick="editFrame(this.src, this.id)"><span id="num' + counter + '" class="frameSpan">' + counter + '</span></div>';
  frames.push(canvas.toDataURL('image/webp', 0.85));
  localStorage.removeItem('frames');
  localStorage.setItem('frames', JSON.stringify(frames));
  document.getElementById('frames').style.width = ((frames.length + 1) * 8) + 'vw';
  document.getElementById('frame' + (frames.length)).scrollIntoView();
  document.getElementById('frameCount').innerHTML = frames.length;

}
var i = 0;
function play() {
  var frameRate = document.getElementById('framerate').value;
  var framerate = 1000 / frameRate;
  document.getElementById('play-btn').setAttribute("disabled", "disabled");
  document.getElementById('play-btn').innerHTML = 'pause_circle';
  document.getElementById('play').style.display = 'block';
  setTimeout(function() {
    document.getElementById('play').src = frames[i];
    i++;
    if (i < frames.length + 1) {
      play();
    }
    else {
      i = 0;
      document.getElementById('play').src = '';
      document.getElementById('play-btn').removeAttribute("disabled");
      document.getElementById('play').style.display = 'none';
      document.getElementById('play-btn').innerHTML = 'play_circle';
    }
  }, framerate)
}
let framesIndex;
let imgSrc;
let imgId;
let idOnly;
let spanId;
document.getElementById('save-edited-frame-btn').setAttribute("disabled", "disabled");
document.getElementById('delete-edited-frame-btn').setAttribute("disabled", "disabled");
function editFrame(src, id) {
  start_index = -1;
  framesIndex = frames.indexOf(src);
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const img = new Image()
  img.src = src
  img.crossOrigin = "Anonymous";
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
  }
  imgId = id;
  idOnlyBef = id.split("frame");
  idOnly = idOnlyBef[1]
  spanId = 'num' + idOnly;
  document.getElementById('save-edited-frame-btn').removeAttribute("disabled");
  document.getElementById('delete-edited-frame-btn').removeAttribute("disabled");

}
function saveEditedFrame() {
  frames[framesIndex] = canvas.toDataURL('image/webp', 0.85);
  document.getElementById(imgId).src = canvas.toDataURL('image/webp', 0.85);
  document.getElementById('save-edited-frame-btn').setAttribute("disabled", "disabled");
  localStorage.removeItem('frames');
  localStorage.setItem('frames', JSON.stringify(frames));
}
function deleteEditedFrame() {
  var removed = frames.splice(framesIndex, 1);
  document.getElementById(imgId).remove();
  document.getElementById(spanId).remove();
  document.getElementById('save-edited-frame-btn').setAttribute("disabled", "disabled");
  document.getElementById('delete-edited-frame-btn').setAttribute("disabled", "disabled");
  localStorage.removeItem('frames');
  localStorage.setItem('frames', JSON.stringify(frames));
  localStorage.removeItem('canvas');
  localStorage.setItem('canvas', canvas.toDataURL('image/webp', 0.85));
  // location.reload();
  document.getElementById('frames').innerHTML = '';
  for (var i = 0; i < frames.length; i++) {
    document.getElementById('frames').innerHTML += '<div class="frame"><img src="' + frames[i] + '" id="frame' + (i + 1) + '" class="frameImg" onclick="editFrame(this.src, this.id)"><span class="frameSpan" id="num' + (i + 1) + '">' + (i + 1) + '</span></div>';
  }
}

function fullClear() {
  var sure = confirm("Bro this means all ur frames are gon. U still wanna do it?")
  if (sure == true) {
    frames = [];
    document.getElementById('frames').innerHTML = '';
    localStorage.removeItem('frames');
    counter = 0;
    document.getElementById('frames').style.width = 0 + 'vw';
    document.getElementById('frameCount').innerHTML = 0;
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

onStart();
//fix keyboard shortcuts lol
onkeydown = function(e) {
  if (e.ctrlKey && e.key == 'S') {
    e.preventDefault();
    e.stopPropagation();
    saveEditedFrame();
    alert('s')
  }
  else if (e.key == 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    play();
    alert('ent')
  }
  else if (e.ctrlKey && e.key == 'D') {
    e.preventDefault();
    e.stopPropagation();
    deleteEditedFrame();
    alert('d')
  }
  else if (e.ctrlKey && e.key == 'X') {
    e.preventDefault();
    e.stopPropagation();
    Clear();
    alert('x')
  }
  else if (e.ctrlKey && e.key == 'A') {
    e.preventDefault();
    e.stopPropagation();
    drawFrame();
    alert('a')
  }
  else if (e.ctrlKey && e.key == 'Z') {
    e.preventDefault();
    e.stopPropagation();
    Restore();
    alert('z');
  }
}
let keysPressed = {};

document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;
  if (keysPressed['Control'] && event.key == 'i') {
    alert(event.key);
  }
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];
});