const mongoose = require('mongoose')


const OcupationSchema = new mongoose.Schema({
    name: {
        type: String
    },
}, { timestamps: true })

const Ocupation = mongoose.model('Ocupation', OcupationSchema)
module.exports = { Ocupation }