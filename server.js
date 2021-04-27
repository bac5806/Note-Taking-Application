// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
var addRequestId = require('express-request-id')();

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// set up the unique ID request
app.use(addRequestId);

// set paths for index.html and notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

let notes = [];

// Displays notes
app.get('/api/notes', (req, res) => {
    // reade the notes stoed in json.db
    notes = fs.readFileSync("db/db.json", "utf8");
    // parse notes
    notes = JSON.parse(notes);
    res.json(notes)
});

// writes the new note to the json file
app.post("/api/notes", (req, res) => {

    // get notes from db.json
    notes = fs.readFileSync("db/db.json", "utf8");
    // parse notes
    notes = JSON.parse(notes);
    // create a new note
    const newNote = req.body;
    newNote.id = notes.length;
    // add new note to notes array
    notes.push(newNote); 
    // stringify notes
    notes = JSON.stringify(notes);
    // writes the note note to json.db
    fs.writeFile("db/db.json", notes, "utf8", err => {});
    res.json(JSON.parse(notes));
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));