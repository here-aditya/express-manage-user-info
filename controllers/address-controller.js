const { Address } = require('../models/common');
const Joi = require('joi');

// Address submission schema
const addressSchema = Joi.array().items(Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().pattern(/^[0-9]{6}?$/).required(),
  country: Joi.string().required(),
  userId: Joi.number().required(),
}));

// Create new addresses for a user
exports.createAddresses = async (req, res) => {
  const { error } = addressSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const addresses = await Address.bulkCreate(req.body);
    res.status(201).json(addresses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
