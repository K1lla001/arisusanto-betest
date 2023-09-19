const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

require('./src/routes')(app)

const db = require('./src/models/index')
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connect to database!")
}).catch((err) => {
    console.log(err)
    process.exit()
})


app.listen(port, () => {
    console.log("Successfully connected!")
})