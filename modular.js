const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('data/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Function to query the database based on user input
function queryDatabase(input) {
  const query = `
    SELECT *
    FROM postal_data
    WHERE region LIKE ? OR province LIKE ? OR city LIKE ? OR zip_code LIKE ?
  `;

  const wildcardInput = `%${input}%`;

  db.all(query, [wildcardInput, wildcardInput, wildcardInput, wildcardInput], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (rows.length > 0) {
      console.log('Possible outputs:');
      rows.forEach(row => {
        console.log('Region:', row.region);
        console.log('Province:', row.province);
        console.log('City:', row.city);
        console.log('Zip Code:', row.zip_code);
        console.log('---');
        console.log('Database connection closed.');
      });
    } else {
      console.log('Error: No matching locations found.');
    }
  });
}

// Sample usage
queryDatabase('7204');
queryDatabase('Sinacaban')