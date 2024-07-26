const express = require('express')
const { loginuser, getuser, registeruser } = require('../controller/userController')
const user = express.Router()

user.post('/user-registration', registeruser)
user.post('/user-login', loginuser)
user.get('/get-user', getuser)


module.exports = user
