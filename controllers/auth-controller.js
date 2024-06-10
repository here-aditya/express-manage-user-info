const { Authentication, User } = require('../models/common');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

// Login schema
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Register handler
exports.register = async (req, res) => {
  try {
      const auth = await Authentication.create(req.body);
      res.status(201).send(auth);
  } catch (error) {
      res.status(400).send(error);
  }
};

// Login handler
exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  try {
    const auth = await Authentication.findOne({ where: { username } });
    if (!auth || !(await auth.validPassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ id: auth.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ id: auth.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Refresh token handler
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const auth = await Authentication.findByPk(decoded.id);
    if (!auth) return res.sendStatus(403);

    const user = await User.findOne({ where: { authId: decoded.id } });
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.json({ user, accessToken });
  } catch (error) {
    res.sendStatus(403);
  }
};

