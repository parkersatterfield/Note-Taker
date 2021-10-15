const note = require('express').Router();

// GET Route for retrieving all the feedback
note.get('/', (req, res) => {
  console.info(`${req.method} request received for feedback`);

});

// POST Route for adding note to JSON
note.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} to unspecified endpoint *****`);
  res.json('Error in taking note');
});

module.exports = note;
