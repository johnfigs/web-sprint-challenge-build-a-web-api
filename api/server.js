const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

// Configure your server here
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.use(errorHandling)

module.exports = server;

// eslint-disable-next-line
function errorHandling(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
    })
  }