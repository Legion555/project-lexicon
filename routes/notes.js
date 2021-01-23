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
router.put('/updateNote', async (req,res) => {
    User.updateOne({
        _id: req.body.userId
    }, {
        $set: {
            'collections.$[i].notes.$[j].title': req.body.title,
            'collections.$[i].notes.$[j].description': req.body.description,
        }
    }, {
        arrayFilters: [{
            'i._id': req.body.collectionId
        }, {
            'j._id': req.body.noteId
        }]
    },
    function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result)
        }
    }
    );
})
//Delete note
router.put('/deleteNote', async (req,res) => {
    console.log(req.body)
    User.updateOne(
        { _id: req.body.userId, 'collections._id': req.body.collectionId },
        { $pull: {
          'collections.$.notes': { 
              _id: req.body.noteId}
            } 
        },
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