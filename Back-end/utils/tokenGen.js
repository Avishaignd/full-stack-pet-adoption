const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const NewRefreshToken = require('../models/refreshTokenSchema')

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const saveRefreshToken = async (refToken, user) => {
  let refreshTokens = await NewRefreshToken.find({})
  let tokenArray = []
  refreshTokens.forEach((item) => {tokenArray.push(item.token)})
  // const current = await NewRefreshToken.find({})
  if (!tokenArray.includes(refToken)){
    const newRefreshToken = new NewRefreshToken
    newRefreshToken.token = refToken
    newRefreshToken.user = user
    await newRefreshToken.save()
  }
}

function generateAccessToken(user) {
  return jwt.sign({
    data: user
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

module.exports = {generateAccessToken, authenticateToken, saveRefreshToken}