var sound = new Audio("content/sounds/click.ogg");

function setupClickEvent(elementId, callback) {
  document.getElementById(elementId).addEventListener("click", function () {
    sound.play();
    if (callback) {
      setTimeout(callback, 250);
    }
  });
}

function singleplayer() {
  document.location.href = '~./singleplayer.html';
}

function options() {
  document.location.href = '~./404.html';
}

function quit() {
  document.location.href = '~./home.html';
}

function title() {
  document.location.href = '~./home.html';
}

function startMultiplayer() {
  window.location.href = "~./patreon-auth.html";
}

setupClickEvent("click7");
setupClickEvent("click4", quit);
setupClickEvent("click1", singleplayer);
setupClickEvent("click2", startMultiplayer);

document.getElementById("year").innerHTML = new Date().getFullYear();


new Crate({
  server: '1159871598644445266', // SummitMC
  channel: '1159878139569258517' // #⛺┃general
})
