const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('./userValidation');

//Get user by email
router.get('/', (req, res) => {
    // User.find().then(items => res.json(items));
    User.find( {email: req.query.email},
        function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          })
})

//Register new user
router.post('/register', async (req,res) => {

    //Check if user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.send('"email" already in use');

    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await newUser.save();
        res.send('success');
    }catch(err){
        res.status(400).send('Error' + err);
    }
});

//Login user
router.post('/login', async (req,res) => {

    //Validate form
    const {error} = loginValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.send('"email" not found');

    //Validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.send('"password" is invalid');

    //Create and assigning token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send('success');
})

module.exports = router