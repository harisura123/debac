const mongoose = require('mongoose')

const UserList = new mongoose.Schema({
    name: String,
    pass: String,
    email: String,
})

const MongodbList = mongoose.model('suryaList', UserList)

module.exports = MongodbList