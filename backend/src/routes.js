const { register, getAll } = require("./controllers/FormController");

const { Router } = require("express");

const routes = new Router();

routes.post("/form", register);
routes.get("/form", getAll);

module.exports = routes;
