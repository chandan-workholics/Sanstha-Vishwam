const express = require('express')
const { register, getadmin, login } = require('../controller/adminController')
const admin = express.Router()

admin.post('/admin-registration', register)
admin.post('/admin-login', login)
admin.get('/get-admin', getadmin)


module.exports = admin
