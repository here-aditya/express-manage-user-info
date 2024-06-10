const { User, Address } = require('../models/common');
const Joi = require('joi');

// User schema
const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^\d{10,15}$/).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required()
});

// Create a new user with addresses
exports.createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // auth user ID added in middleware
  authId = req.authId;

  const { firstName, lastName, email, phoneNumber, dob, gender } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      dob,
      gender,
      authId
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
