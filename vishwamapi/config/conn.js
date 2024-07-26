const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://virajkaleworkholic:virajkaleworkholicgmailcom@cluster0.jag9pvj.mongodb.net/vishwam')
    .then(() => {
        console.log('connected')
    }).catch((err) => {
        console.log(err)
    })