const express = require('express')
const { addOcupation, getOcupation, updateOcupation, deleteOcupation, getOcupationbyId } = require('../controller/ocupationController')
const Ocupation = express.Router()


Ocupation.post('/add-Ocupation', addOcupation)
Ocupation.get('/get-Ocupation', getOcupation)
Ocupation.put('/update-Ocupation/:id', updateOcupation)
Ocupation.delete('/delete-Ocupation/:id', deleteOcupation)
Ocupation.get('/get-Ocupation/:id', getOcupationbyId)



module.exports = Ocupation