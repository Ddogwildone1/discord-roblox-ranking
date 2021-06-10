const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async () => {
    await mongoose.connect(process.env.Dburi, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    return mongoose
}