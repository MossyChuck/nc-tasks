const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const PORT = 3000;

let notes = require('./notes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/notes', (req, res) => {
  res.send(notes);
});

app.get('/notes/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  let note = notes.filter((note) => {
    return note.id === id;
  })[0];
  res.send(note);
});

app.post('/notes', (req, res) => {
  const newId = notes.length ? notes[notes.length - 1].id + 1 : 1;
  const text = req.body.text;
  const tags = req.body.tags;
  const newNote = {
    id: newId,
    text: text,
    tags: tags
  };
  notes.push(newNote);
  fs.writeFile('./notes.json', JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(newNote)
    }
  });
});

app.delete('/notes/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  notes = notes.filter((note) => {
    return note.id !== id;
  });
  fs.writeFile('./notes.json', JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(notes);
    }
  });
});

app.put('/notes/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  const newText = req.body.text;
  const newTags = req.body.tags;
  notes = notes.map((note) => {
    if (note.id === id) {
      return {id: id, text: newText, tags: newTags};
    }
    return note;
  });
  fs.writeFile('./notes.json', JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send({id: id, text: newText, tags: newTags});
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}...`);
});