// Routes for api/notes endpoint
const notes = require('express').Router();
const { readAndAppend, writeToFile, readFromFile } = require('../helpers/helpers');
const path = require('path');
const { response } = require('express');
const fs = require('fs');
const uuid = require('uuid');
const { randomUUID } = require('crypto');

// GET Route for notes page 
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding note to JSON
notes.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to take note`);

  // Destructuring note for the items in req.body
  const noteText = req.body.text;
  const noteTitle = req.body.title;
  const noteID = uuid.v4();
  const noteObject = {
    title: noteTitle,
    text: noteText,
    id: noteID
  };

  // If all the required properties are present
  if (noteText && noteTitle) {
    console.info(`${noteObject} note logged`);
    res.json(response);

    // push note object to array stored in db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        const updatedNotes = parsedNotes.push(noteObject);
        console.log(updatedNotes);
        console.log(parsedNotes);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

  } else {
    res.json('Error in taking note');
  }
});

module.exports = notes;
