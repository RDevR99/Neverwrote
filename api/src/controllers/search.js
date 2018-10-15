const express = require("express");
const _ = require("lodash");
const models = require("../models");

const router = express.Router();

function searchFilter(obj) {
  //lets see if this helps
}

router.get('/notes/:phrase', (req,res) => {

  models.Note.findAll({
    where:{
      $or:[
        {title:{ $like:'%'+req.params.phrase+'%'}},
        {content: {$like:'%'+req.params.phrase+'%'}}
      ]
    }
  })
  .then(notes => res.json(notes))
  .catch(err => res.status(500).json({error:err.message}))

});

module.exports = router;