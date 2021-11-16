const express = require('express');
const apiRoute = require("./apiRoute.js");
const path = require("path")
require("dotenv").config();


// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(apiRoute)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
