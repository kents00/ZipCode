const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('data/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


function queryDatabase(input, callback) {
  const query = `
    SELECT *
    FROM postal_data
    WHERE region LIKE ? OR province LIKE ? OR city LIKE ? OR zip_code LIKE ?
  `;

  const wildcardInput = `%${input}%`;

  db.all(query, [wildcardInput, wildcardInput, wildcardInput, wildcardInput], (err, rows) => {
    if (err) {
      console.error(err.message);
      return callback(err, null);
    }

    callback(null, rows);
  });
}

module.exports = {
  queryDatabase,
  db
};
