const express = require('express');
const mainRouter = require('./routes');
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors');
const errorHandling = require('./middlewares/error');

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.use(mainRouter);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})