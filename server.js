const express = require("express");

const projectRouter = require("./routers/projectRouter");

const actionRouter = require("./routers/actionRouter");

const helmet = require("helmet");

const server = express();

server.use(express.json());

server.use(logger);

server.use(helmet());

server.use("/action", actionRouter);

server.use("/project", projectRouter);

server.get("/", (request, response) => {
  response.send("THIS CODE IS REALLY WORKING.");
});

function logger(req, res, next) {
  console.log(
    `${req.method} ${req.originalUrl} at ${new Date().toISOString()}`
  );

  next();
}

module.exports = server;
