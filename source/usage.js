const { queryDatabase } = require('./modular');

queryDatabase('7203', (err, rows) => {
  if (err) {
    console.error('Error occurred:', err.message);
  } else if (rows.length === 0) {
    console.log('No results found.');
  } else {
    console.log('Search results:', rows);
  }
});
