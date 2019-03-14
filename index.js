const express = require('express');
// Generate the express app
const app = express();

// Setting up a route handler
app.get('/', (req, res) => {
	res.send({ bye: 'buddy' });
});

// Telling express on which port to listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT);
