const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config({ path: './config/config.env' })

require('./config/conn')
app.use(bodyParser.json())
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const Ocupation = require('./route/ocupationRoute')
const customer = require('./route/customerRoute')
const admin = require('./route/adminRoute')
const user = require('./route/userRoute')

app.use('/api/v1', Ocupation)
app.use('/api/v1', customer)
app.use('/api/v1', admin)
app.use('/api/v1', user)

app.listen(process.env.PORT, () => {
    console.log(`server start ${process.env.PORT}`)
})