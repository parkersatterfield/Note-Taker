const express = require('express');

// Import modular routers
const notesRouter = require('./noteRouter');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
