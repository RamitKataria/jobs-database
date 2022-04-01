import express, { Request, Response, NextFunction } from 'express';

const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')

const positionsServices = require('./services/positionsServices');
const citiesServices = require('./services/citiesServices');
const countriesServices = require('./services/countriesServices');


const PORT = process.env.PORT || 5001; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
const isProduction = require('./config').isProduction;

const origin = {
  origin: isProduction ? 'https://jobsdata.netlify.app' : '*',
}

const limiter = rateLimit({
  windowMs: 1000, // 5 seconds
  max: 2, // 5 requests,
})

const app = express(); // create an instance of the express module (app is the conventional variable name used)
app.use(cors()); // app.use(cors(origin)); // Enable CORS
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);

app.route('/api')
    .get(positionsServices.testAPI);

app.route('/api/positions/:queryType/:pid/:url/:description/:title/:expiry/:comid/:ptype/')
    .get(positionsServices.querySwitchPositions)

app.route('/api/positions/:queryType/')
    .get(positionsServices.querySwitchPositions)

app.route('/api/positions')
    .post(positionsServices.insertRowPositions)
    .put(positionsServices.updateRowPositions)

app.route('/api/positions/:pid/')
    .delete(positionsServices.deleteRowPositions);

app.route('/api/cities/:cityname/:statename/:counname/')
    .get(citiesServices.projectionQueryCities)

app.route('/api/cities/:cityname/:counname/')
    .delete(citiesServices.deleteRowCities);

app.route('/api/countries')
    .get(countriesServices.projectionQueryCountries)

app.route('/api/countries/:counname')
    .delete(countriesServices.deleteRowCountries);


app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
})
