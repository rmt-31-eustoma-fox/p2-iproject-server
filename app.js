const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const route = require('./routes')


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())
app.use(route)
app.listen(port, ()=> console.log(`Listening to port ${port}`))