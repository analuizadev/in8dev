const http = require("http");

const routes = require("./routes");
const { mongoConnection } = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

class App {
  constructor() {
    mongoose.connect(mongoConnection);

    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());

    this.server = http.Server(this.app);
    this.routes();
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().server;
