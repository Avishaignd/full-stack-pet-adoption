const express = require("express");
require('dotenv').config()
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('../passport/passport')
const {authenticateToken, generateAccessToken, saveRefreshToken} = require('../utils/tokenGen')
const { getUserById, deleteUserById, updateUserById, addNewUser, getUsers, validateRefreshToken} = require("../controls/userCtrl");

router.get("/", authenticateToken, getUsers);

router.get("/:id", getUserById);

router.delete("/:id", deleteUserById);

router.post('/token', validateRefreshToken)

router.post("/", addNewUser);

router.post('/login',
  passport.authenticate('local'), async (req, res) => {
    const accessToken = generateAccessToken(req.user.email, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'})
    const refreshToken = jwt.sign(req.user.email, process.env.REFRESH_TOKEN_SECRET)
    saveRefreshToken(refreshToken, req.user._id)
    res.send({accessToken: accessToken, user: req.user, refreshToken: refreshToken})
  });

router.put("/:id", authenticateToken, updateUserById);

module.exports = router;
