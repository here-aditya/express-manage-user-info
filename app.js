const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const addressRoutes = require('./routes/address-routes');
const userRoutes = require('./routes/user-routes');
var cors = require('cors')
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use('/api', userRoutes);
app.use('/api', addressRoutes);
app.use('/api', authRoutes);

module.exports = app;
