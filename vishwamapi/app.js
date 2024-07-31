const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config({ path: './config/config.env' })
const multer = require('multer')
const md5 = require('md5')
const path = require('path')
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
const user = require('./route/userRoute');
const state = require('./route/stateRoutes');
const city = require('./route/cityRoutes');

app.use('/api/v1', Ocupation)
app.use('/api/v1', customer)
app.use('/api/v1', admin)
app.use('/api/v1', user)
app.use('/api/v1', state)
app.use('/api/v1', city)


app.post('/uploading', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, callback) {
            callback(null, md5(Date.now()) + path.extname(file.originalname));
        }
    });

    const uploaFile = multer({
        storage: storage,
    }).single('image');

    uploaFile(req, res, async (err) => {

        if (!req.file) {
            res.status(500).send({
                sucecess: false,
                data: [],
                message: "Select File"
            });

        } else if (err) {
            res.status(500).send({
                sucecess: false,
                data: [],
                message: "not upload"
            });

        } else {

            res.status(200).send({
                sucecess: true,
                data: { filepath_url: req.file.filename, url: process.env.MAIN_URL + "uploads/" + req.file.filename },
                message: "",
            });

        }
    });
})

app.listen(process.env.PORT, () => {
    console.log(`server start ${process.env.PORT}`)
})