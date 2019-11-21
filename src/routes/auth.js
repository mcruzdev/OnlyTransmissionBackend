const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("User");

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

router.post("/authenticate", async (req, res) => {
  const { login, password } = req.body;

  const defaultMessage = "Invalid credentials";

  if (!login || !password) {
    return res.status(403).send({
      error: defaultMessage
    });
  }

  const user = await User.findOne({ login }).select("+password");

  if (!user) {
    return res.status(400).send({ error: defaultMessage });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: defaultMessage });
  }

  const oneDay = 86400;
  const token = jsonwebtoken.sign({ id: user.id }, process.env.API_SECRET, { expiresIn: oneDay });

  res.status(200).send({ user, token });
});

router.post("/register", async (req, res) => {
  const { login, password } = req.body;
  const BCRYPT_SALT_ROUNDS = 10;

  try {
    const alreadyExists = await User.findOne({ login });

    if (alreadyExists) {
      res.status(400).send({
        error: "User already exists"
      });
    }

    if (login && password) {
      const user = await User.create({
        login,
        password: await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
      });

      user.password = undefined;
      res.status(201).send({ success: user });
    } else {
      res.status(401).send({
        error: "Invalid user"
      });
    }
  } catch (error) {
    res.status(500).status({
      error: "Server error"
    });
  }
});

module.exports = router;
