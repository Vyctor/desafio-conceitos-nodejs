const express = require("express");

const RepositoryController = require("./controllers/RepositoryController");

const routes = express.Router();

routes.get("/repositories", RepositoryController.index);

routes.post("/repositories", RepositoryController.create);

routes.put(
  "/repositories/:id",
  RepositoryController.validateRepositoryID,
  RepositoryController.update
);

routes.delete(
  "/repositories/:id",
  RepositoryController.validateRepositoryID,
  RepositoryController.delete
);

routes.post(
  "/repositories/:id/like",
  RepositoryController.validateRepositoryID,
  RepositoryController.like
);

module.exports = routes;
