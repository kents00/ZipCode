# ZipCode
“Directory of zip codes in one package!”

The purpose of this project is to provide a solution for users to search for locations based on region, province, city, or zip code. The application uses SQLite as its database management system to store and retrieve data.

## **Installation**

To use this application, you need to have Node.js installed on your system. You can download and install Node.js from the official website:

<https://nodejs.org/en/download/>

Once Node.js is installed, you can install the required dependencies by running the following command in your terminal:

```bash
npm install
```

This command will install `express` and `sqlite3` packages, which are used by the application.

## **Usage**

To start the application using and API, run the following command in your terminal `node api.js`

This will start the server on port 3000. You can then send a GET request to the `/search` endpoint with the `input=` parameter set to the desired search query. For example, you can use a tool like

[Postman](https://www.postman.com/) or [curl](https://curl.se/) to send a request like this:

```bash
GET http://localhost:3000/search?input=London
```

The application will then return a JSON response containing the matching locations. If no matching locations are found, it will return a 404 status code with an error message.

You can also use the non API functionality as well by executing the `modular.js` you can use this reference below by accessing the `usage.js` file:

```bash
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

```

## **Contributing**

If you find any bugs or have suggestions for improvements, please [open an issue](https://github.com/kents00/ZipCode/issues) or submit a [pull request](https://github.com/kents00/ZipCode/pulls). We welcome any contributions to make this application better.

## **License**

This project is licensed under the [MIT License](https://www.perplexity.ai/LICENSE)
