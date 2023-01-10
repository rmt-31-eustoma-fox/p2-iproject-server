// if (process.env.NODE_ENV != 'production'){
//     require('dotenv').config()
// }
const cors = require('cors')
const express = require('express')
// const errorHandler = require('./middlewares/errorhandler')
const router = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

// app.use(errorHandler)

app.listen(port, () => {
    console.log("App on port " + port)
})

module.exports = app