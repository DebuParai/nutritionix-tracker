// backend/server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

const APP_ID = '48e708172dcf9cea3696f12e7baa9d10'; // Your Nutritionix API Key
const APP_KEY = '48e708172dcf9cea3696f12e7baa9d10';

app.use(cors());
app.use(express.json());

app.post('/api/nutrition', async (req, res) => {
  const { query } = req.body;

  try {
    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'x-app-id': APP_ID,
        'x-app-key': APP_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nutrition info' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
