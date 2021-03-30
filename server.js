/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
const path = require("path");
const express = require("express");
const morgan = require("morgan");
// const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const favicon = require("express-favicon");

require("dotenv").config();

const middlewares = require("./middlewares");

const logs = require("./api/logs");

const app = express();

mongoose.connect(process.env.REACT_APP_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
// app.use(helmet());
app.use(cors());
app.use(favicon(path.join(__dirname, "/client/build/favicon.ico")));

app.use(express.json());
/*
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});
*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/ping", (req, res) => {
    res.send("pong");
  });
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/api/logging", logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at port : ${port}`);
});
