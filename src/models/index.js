const dbConfig = require('../config/db.config')
const mongoose= require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.users = require('./user.model')(mongoose)
db.admin = require('./admin.model')(mongoose)

module.exports = db