function startPatreonAuth() {
  fetch('/check-patron-status')
    .then(response => response.json())
    .then(data => {
      if (data.isPatron) {
        window.location.href = "/pages/vault.html";
      } else {
        window.location.href = "/pages/not-patron.html";
      }
    })
    .catch(error => {
      console.error("Error checking patron status:", error);
    });
  fetch('/status')
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(error => console.error('Error:', error));
}
