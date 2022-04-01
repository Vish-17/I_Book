const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'saurabhitsme'




//ROUTE 1: Create user login using: 'api/auth/createuser. no login require'
router.post('/createuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  // console.log(req.body);
  // const user = User(req.body)
  // user.save();

  //Checking error if true return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  //checking weather the user with same email exists already
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: 'User with this same email already exist' })
    }


    //Securing password

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Creatig User
    user = await User.create({
      name: req.body.name,
      //Before Applying Salt
      // password: req.body.password,


      //After Applying salt 
      password: secPass,

      email: req.body.email
    })

    // .then(user => res.json(user))
    // .catch(err=>{
    //     console.log(err)
    //     res.json({error: 'Please send Unique value', message: err.message})
    // })


    //Using JWT
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);


    //Before JWT
    // res.json(user)

    //After JWT
    success= true
    res.json({success, authToken })

  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occured")
  }
})





//ROUTE 2: Authenticate a user: 'api/auth/login. no login require'
router.post('/login', [
  body('email', 'Enter Valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {

  let success = false;
  //Checking error if true return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Verifying user
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({success, error: "Incorrect Password" })
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).send({ error: "Incorrect Passeord" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true
    res.json({success, authToken });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error: Some Error Occured")
  }
})






//ROUTE 3: Get User Detail: 'api/auth/getuser. login require'
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error: Some Error Occured")
  }
})

module.exports = router