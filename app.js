const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const cors = require('cors');
const { config } = require("dotenv");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}



app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})