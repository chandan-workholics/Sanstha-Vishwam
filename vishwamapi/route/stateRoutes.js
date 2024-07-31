const express = require('express')
const { getAllStates, createState } = require('../controller/StateController')
const state = express.Router()

state.post('/create-state', createState)

state.get('/get-state', getAllStates)


module.exports = state