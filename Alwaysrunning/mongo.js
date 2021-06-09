const mongoose = require('mongoose')
const { dbURI } = require('../config.json')

module.exports = async () => {
    await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    return mongoose
}