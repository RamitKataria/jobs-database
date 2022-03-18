import express, { Request, Response, NextFunction } from 'express';
// const express = require('express'); // import express module (simplifies routing/requests, among other things)

// const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const app = express(); // create an instance of the express module (app is the conventional variable name used)

const services = require('./services/requests')

const PORT = process.env.PORT || 5001; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

// app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.urlencoded({ extended: true }))


app.get('/api/positions', (req: Request, res: Response) => { // route root directory ('/' is this file (app.js))

});

app.post('/api/positions', (req, res) => {
  
});

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 