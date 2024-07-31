const express = require('express')
const { getAllCities, createCity, getCitiesByState } = require('../controller/CityController')
const city = express.Router()

city.post('/create-city', createCity)
city.get('/get-city/:stateId', getCitiesByState)
city.get('/get-city', getAllCities)


module.exports = city