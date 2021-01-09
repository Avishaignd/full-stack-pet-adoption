const User = require('../models/userSchema')
const Pet = require('../models/petSchema')
const NewRefreshToken = require('../models/refreshTokenSchema')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
const { generateAccessToken } = require('../utils/tokenGen');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const getUsers = async (req, res) => {
    User.find(function (err, users) {
    if (err) return console.error(err);
    res.send(users);
  })
};

const getUserById = async (req, res) => {
  const foundUser = await User.find({ _id: req.params.id })
  res.send(foundUser)
};

const deleteUserById = async (req, res) => {
  const userToDelete = await User.deleteOne({ _id: req.params.id})
  res.json(userToDelete);
};

const addNewUser = async (req, res) => {
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }}
  const newUser = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  newUser.password = hashedPassword;
  const saveUser = new User(newUser)
  saveUser.save(function (err, saveUser) {
    if (err) return console.error(err);
    // console.log(saveUser);
  })
  const accessToken = generateAccessToken(saveUser.email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60m'})
  res.send({accessToken: accessToken, user: saveUser});
};

const updateUserById = async (req, res) => {
  const userId = req.params
  const updates = req.body.data
  const checkEmpty = (toUpdate, current) => {
    if (toUpdate.length > 0){
      return toUpdate
    } else {
      return current
    }
  }
  const found = await User.findOne({_id: userId.id})
  if (bcrypt.compare(updates.password, found.password)){
    try {
      found.firstName = checkEmpty(updates.firstName, found.firstName)
      found.lastName = checkEmpty(updates.lastName, found.lastName)
      found.email = checkEmpty(updates.email, found.email)
      found.phoneNumber = checkEmpty(updates.phoneNumber, found.phoneNumber)
      found.bio = checkEmpty(updates.bio, found.bio)
      await found.save()
      res.send(found)
    } catch(err) {
      res.send(err)
    }
  } else {
    res.sendStatus(403)
  }
};

const validateRefreshToken = async (req, res) => {
    let refreshTokens = await NewRefreshToken.find({})
    let tokenArray = []
    refreshTokens.forEach((token) => {tokenArray.push(token.token)})
    const currentRefreshToken = req.body.token
    const email = req.body.email
    if (currentRefreshToken == null) return res.sendStatus(401)
    if (!tokenArray.includes(currentRefreshToken)) return res.sendStatus(403)
    jwt.verify(currentRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken(email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
      res.send({ accessToken: accessToken })
    })
}

module.exports = {
  getUserById,
  deleteUserById,
  addNewUser,
  updateUserById,
  getUsers,
  validateRefreshToken
};
