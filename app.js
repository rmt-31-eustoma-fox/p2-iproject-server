if (process.env.NODE_ENV !== "productions") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log("App is running on port", port);
});
