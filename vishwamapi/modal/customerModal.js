const mongoose = require('mongoose')


const CustomerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    number: {
        type: Number
    },
    whatsappno: {
        type: Number
    },
    aadharimg: {
        type: String
    },
    ocupation:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ocupation",
    },
    adress: {
        type: String
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
    },
    adharno: {
        type: String
    },
    reference: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


const customer = mongoose.model('Customer', CustomerSchema)
module.exports = { customer }