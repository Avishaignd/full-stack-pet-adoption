const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

async function authenticateUser(req, res) {
  const user = await User.findOne({ email: { $eq: req.body.email } });
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      return user
    } else {
      return false
    }
  } catch {
    res.status(500).send();
  }
}

async function authenticatePassword(user, password) {
  const checkedUser = await User.findOne({ email: { $eq: user.email } });
  try {
    if (await bcrypt.compare(password, checkedUser.password)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.log(err);
    return err
  }
}

module.exports = {authenticateUser, authenticatePassword}