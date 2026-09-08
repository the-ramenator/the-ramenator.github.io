document.getElementById('play').style.display = 'none';


//About
var Amodal = document.getElementById("AModal");
var Abtn = document.getElementById("ABtn");
var Aspan = document.getElementsByClassName("close")[0];
Abtn.onclick = function() {
  Amodal.style.display = "block";
}
Aspan.onclick = function() {
  Amodal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == Amodal || event.target == Hmodal || event.target == Kmodal) {
    Amodal.style.display = "none";
    Hmodal.style.display = "none";
    Kmodal.style.display = "none";
  }
}


//Help
var Hmodal = document.getElementById("HModal");
var Hbtn = document.getElementById("HBtn");
var Hspan = document.getElementsByClassName("close")[1];
Hbtn.onclick = function() {
  Hmodal.style.display = "block";
}
Hspan.onclick = function() {
  Hmodal.style.display = "none";
}


//Keyboard Shortcuts
var Kmodal = document.getElementById("KModal");
var Kbtn = document.getElementById("KBtn");
var Kspan = document.getElementsByClassName("close")[2];
Kbtn.onclick = function() {
  Kmodal.style.display = "block";
}
Kspan.onclick = function() {
  Kmodal.style.display = "none";
}
