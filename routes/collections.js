const router = require('express').Router();
const User = require('../models/User');

//Create collection
router.put('/create', async (req,res) => {
    User.updateOne(
        { _id: req.body.userId },
        { $push: {
            collections: {
                _id: req.body._id,
                title: req.body.title
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

//Delete collection
router.put('/delete', async (req,res) => {
    User.updateOne(
      { _id: req.body.userId },
      { $pull: { collections: {_id: req.body.collectionId}}}, 
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