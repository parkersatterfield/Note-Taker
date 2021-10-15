const express = require('express');

// Import modular routers
const notesRouter = require('./noteRouter');
const otherRouter = require('./otherRouter');

const app = express();

app.use('/notes', notesRouter);
app.use('/*', otherRouter);

module.exports = app;
