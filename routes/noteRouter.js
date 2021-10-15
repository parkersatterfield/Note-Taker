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

// // DELETE Request
// notes.delete('/:id', (req, res) => {
//   // Log that a DELETE request was received
//   console.info(`${req.method} request received to delete note`);

//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedNotes = JSON.parse(data);
//       const itemIndex = parsedNotes.findIndex(({ id }) => id == req.params.id);
//       deletedNote = parsedNotes.splice(itemIndex, 1);
//       updatedNotes = parsedNotes.splice(deletedNote);
//       // console.log(updatedNotes);

//       // Causing delete to run twice??? Bug 
//       fs.writeFile(
//         './db/db.json',
//         JSON.stringify(updatedNotes),
//         (writeErr) =>
//           writeErr
//             ? console.error(writeErr)
//             : console.info('Successfully updated notes!')
//       );
//     }
//   });
// });

module.exports = notes;
