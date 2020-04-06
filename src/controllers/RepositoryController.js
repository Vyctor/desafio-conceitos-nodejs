const { uuid, isUuid } = require("uuidv4");
const repositories = [];

module.exports = {
  logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
  },

  validateRepositoryID(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: "Invalid Repository ID" });
    }

    return next();
  },

  index(request, response) {
    const results = repositories;

    return response.json(results);
  },

  create(request, response) {
    const { title, url, techs } = request.body;

    const repository = { id: uuid(), title, url, techs, likes: 0 };

    repositories.push(repository);

    return response.json(repository);
  },

  update(request, response) {
    const { id } = request.params;
    const { title, url, techs } = request.body;
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    const oldRepository = repositories.find(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found." });
    }

    const repository = {
      id,
      title: title ? title : oldRepository.title,
      url: url ? url : oldRepository.url,
      techs: techs ? techs : oldRepository.techs,
      likes: oldRepository.likes,
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
  },

  like(request, response) {
    const { id } = request.params;

    const oldRepository = repositories.find(
      (repository) => repository.id === id
    );

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found." });
    }

    const repository = {
      id,
      title: oldRepository.title,
      url: oldRepository.url,
      techs: oldRepository.techs,
      likes: oldRepository.likes + 1,
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
  },

  delete(request, response) {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: "Repository not found." });
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  },
};
