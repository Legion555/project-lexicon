const router = require('express').Router();
const User = require('../models/User');

//Add note
router.put('/addNote', async (req,res) => {
    console.log(req.body)
    User.updateOne(
        { _id: req.body.userId, 'collections._id': req.body.collectionId },
        { $push: {
            'collections.$.notes': {
                _id: req.body._id,
                title: req.body.title,
                description: req.body.description
                }
            }
        },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
})
//Update note
router.put('/editNote', async (req,res) => {
    console.log(req.body)
    User.updateOne(
        { _id: req.body.userId, "notes._id": req.body.noteId },
        { $set: {
            "notes.$.title": req.body.title,
            "notes.$.description": req.body.description
            }
        },
        function(err, result) {
            if (err) {
            res.send(err);
            } else {
            res.send(result);
            }
        }
    );
})
//Delete note
router.put('/deleteNote', async (req,res) => {
    console.log(req.body)
    User.updateOne(
      { _id: req.body.userId, 'collections._id': req.body.collectionId },
      { $pull: { 'collections.$.notes': {_id: req.body.noteId} } },
          {multi: true},
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
})

module.exports = router