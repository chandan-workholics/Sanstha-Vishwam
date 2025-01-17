const express = require('express')
const { addcustomer, getcustomer, getcustomerbyId, deletecustomer, updatecustomer } = require('../controller/customerController')
const customer = express.Router()


customer.post('/add-customer', addcustomer)
customer.get('/get-customer', getcustomer)
customer.get('/get-customer/:id', getcustomerbyId)
customer.delete('/delete-customer/:id', deletecustomer)
customer.put('/update-customer/:id', updatecustomer)


module.exports = customer