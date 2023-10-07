function multiplayerClickEvent(elementId, callback) {
  document.getElementById(elementId).addEventListener("click", function() {
    sound.play();
    setTimeout(callback, 250);
  });
}
function multiplayer() {
  const express = require('express');
  const session = require('express-session');
  const axios = require('axios');
  const { v4: uuidv4 } = require('uuid');

  const app = express();

  const userSecrets = {}; // This would be a database in a real application

  app.use((req, res, next) => {
    // Assume user identification is in req.headers.user
    let userId = req.headers.user;

    if (!userId) {
      userId = uuidv4(); // Generate a new user ID if one doesn't exist
      res.setHeader('X-User-Id', userId); // Return the user ID in the response headers
    }

    if (!userSecrets[userId]) {
      userSecrets[userId] = uuidv4(); // Generate a new secret for this user
    }

    // Set up session with user-specific secret
    const userSession = session({
      secret: userSecrets[userId],
      resave: false,
      saveUninitialized: true
    });

    userSession(req, res, next);
  });

// Endpoint to start the Patreon OAuth flow
  app.get('/patreon/patrons.html', (req, res) => {
    const state = Math.random().toString(36).substr(2, 10);
    req.session.patreonState = state; // Store the state in session

    const baseUrl = 'https://www.patreon.com/oauth2/authorize';
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: 'yOXZgIoKBJudCRln5wj6CTz_HmqNCwe3Th3O_8G8XR0fSsQg5fsQox496NWERjZr',
      redirect_uri: 'https://summitmc.xyz/patreon/patrons.html',
      state: state
    });

    res.redirect(`${baseUrl}?${params}`);
  });

// Endpoint where Patreon will redirect after authorization
  app.get('/callback', async (req, res) => {
    const { code, state } = req.query;

    // Check state matches to prevent CSRF
    if (state !== req.session.patreonState) {
      return res.status(400).send('State mismatch. Potential CSRF detected.');
    }

    try {
      const response = await axios.post('https://www.patreon.com/api/oauth2/token', {
        code: code,
        grant_type: 'authorization_code',
        client_id: 'yOXZgIoKBJudCRln5wj6CTz_HmqNCwe3Th3O_8G8XR0fSsQg5fsQox496NWERjZr',
        client_secret: 'N5srThPyUGKowMZWz_wiQ5qM32givfXslKej_q2OHracCmxjm8L1WTnONao_NpL1',
        redirect_uri: 'https://summitmc.xyz/patreon/patrons.html'
      });

      // Here, you now have an access token in response.data.access_token
      // Store it securely and use it to make Patreon API calls
      req.session.patreonToken = response.data.access_token;

      res.send('Successfully authenticated with Patreon!');
    } catch (err) {
      res.status(500).send('Error exchanging code for token.');
    }
  });

  app.listen(3000, () => {
    console.log('Server running on https://summitmc.xyz');
  });

}

multiplayerClickEvent("click2", multiplayer);
