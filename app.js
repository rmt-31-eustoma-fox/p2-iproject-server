const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const route = require('./routes')
const { errorHandler } = require('./helper/errorHandler')


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(route)
app.use(errorHandler)
app.listen(port, ()=> console.log(`Listening to port ${port}`))