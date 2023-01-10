if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes');
const { errHandler } = require('./middlewares');

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})