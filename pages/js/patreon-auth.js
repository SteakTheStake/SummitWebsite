function startPatreonAuth() {
  fetch('/check-patron-status')
    .then(response => {
      // Ensure the response is valid JSON
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
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
}

// You can call this function on a button click or any other event
// For instance, if you have a button with an ID 'patreonAuthBtn', you can do:
document.querySelectorAll('.patreonAuthBtnClass').forEach(element => {
  element.addEventListener('click', startPatreonAuth);
});
