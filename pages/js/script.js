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
  document.location.href = 'singleplayer.html';
}

function options() {
  document.location.href = '404.html';
}

function quit() {
  document.location.href = 'home.html';
}

function title() {
  document.location.href = 'home.html';
}

function startMultiplayer() {
  window.location.href = "vault.html";
}

function connect() {
  window.location.href = "https://www.patreon.com/oauth2/authorize?response_type=code&client_id=yOXZgIoKBJudCRln5wj6CTz_HmqNCwe3Th3O_8G8XR0fSsQg5fsQox496NWERjZr&redirect_uri=https://summitmc.xyz/pages/vault.html";
}

setupClickEvent("click7", connect);
setupClickEvent("click4", quit);
setupClickEvent("click1", singleplayer);
setupClickEvent("click2", startMultiplayer);

document.getElementById("year").innerHTML = new Date().getFullYear();
