const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})


userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this.id }, process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({ token: token });
        // await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}


const user = mongoose.model('User', userSchema)
module.exports = { user }