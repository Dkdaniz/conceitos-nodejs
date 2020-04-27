const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { id, title, url, techs } = request.body;
  console.log(id);
  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url} = request.body;

  const IndexRepository = repositories.findIndex(repository => repository.id === id);
  if (IndexRepository < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const { likes } = repositories[IndexRepository];

  const repository = {
    id,
    title,
    techs,
    url,
    likes
  }

  repositories[IndexRepository] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;

  console.log(id);

  const IndexRepository = repositories.findIndex(repository => repository.id === id);
  if (IndexRepository < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(IndexRepository, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const IndexRepository = repositories.findIndex(repository => repository.id == id);
  if (IndexRepository < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const repository = repositories.find(repository => repository.id == id);

  repository.likes += 1;

  repositories[IndexRepository] = repository;
  
  return response.status(200).json(repository);
});

module.exports = app;


