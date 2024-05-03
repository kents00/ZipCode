const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('data/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.get('/search', (req, res) => {
  const input = req.query.input;

  const query = `
    SELECT *
    FROM postal_data
    WHERE region LIKE ? OR province LIKE ? OR city LIKE ? OR zip_code LIKE ?
  `;

  const wildcardInput = `%${input}%`;

  db.all(query, [wildcardInput, wildcardInput, wildcardInput, wildcardInput], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'No matching locations found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
