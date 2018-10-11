const express = require("express");
const _ = require("lodash");
const models = require("../models");

const router = express.Router();

//Selects only the fields that are allowed to be set by users
function postFilter(obj) {
  return _.pick(obj, ['title','content','notebookId']);
}

//Returns a list of all notes.
router.get("/", (req, res) => {
  models.Note.findAll({ oder: [["createdAt", "DESC"]] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Creates a new note using the posted data.
router.post("/", (req, res) => {
  models.Note.create(postFilter(req.body))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

//Returns a single note by ID.
router.get("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => err.status(500).json({ error: err.message }));
});

//Deletes a single note by ID.
router.delete("/:noteId", (req, res) => {
  models.Note.destroy({where: {id:req.params.noteId}})
    .then(() => res.json({}))
    .catch(err => err.status(500).json({ error: err.message }));
});

//Updates the attributes of a particular note.
router.put("/:noteId", (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.update(postFilter(req.body)))
    .then(note => res.json(note))
    .catch(err => err.status(500).json({ error: err.message }));
});

module.exports = router;

