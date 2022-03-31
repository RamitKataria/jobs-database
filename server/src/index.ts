import express, { Request, Response, NextFunction } from 'express';

const app = express(); // create an instance of the express module (app is the conventional variable name used)
const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')

const positionsServices = require('./services/positionsServices');

const PORT = process.env.PORT || 5001; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const isProduction = require('./config').isProduction;

const origin = {
  origin: isProduction ? 'https://jobsdata.netlify.app' : '*',
}

const limiter = rateLimit({
  windowMs: 51 * 1000, // 5 seconds
  max: 5, // 5 requests,
})

app.use(cors()); // app.use(cors(origin)); // Enable CORS
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);

app.route('/api')
    .get(positionsServices.testAPI);

app.route('/api/positions')
    .get(positionsServices.querySwitchPositions)
    .post(positionsServices.insertRowPositions);

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
})
