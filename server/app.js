const express = require('express')
const app = express()
const port = 3000
const indexRoutes = require('./routers')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(indexRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})