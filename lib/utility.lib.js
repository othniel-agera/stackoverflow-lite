const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const formatValues = (values) => {
  const newValues = {};
  Object.keys(values).map((key) => {
    if (typeof values[key] === 'string') {
      newValues[key] = values[key].trim().toLowerCase();
    } else { newValues[key] = values[key]; }
    return newValues;
  });
  return newValues;
};

const filterValues = (values, keys) => {
  const filteredValues = Object.keys(values)
    .filter((key) => keys.includes(key) && values[key])
    .reduce((response, key) => {
      response[key] = values[key];
      return response;
    }, {});
  return filteredValues;
};

const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const createAuthToken = (userId) => {
  console.log(process.env.SESSION_SECRET);
  const accessToken = jwt.sign({ userId, type: 'access' }, process.env.SESSION_SECRET, { expiresIn: '24h' });
  const refreshToken = jwt.sign({ userId, type: 'refresh' }, process.env.SESSION_SECRET, { expiresIn: '720h' });
  return { accessToken, refreshToken };
};

const comparePasswords = async (password, userPassword) => {
  const match = await bcrypt.compare(password, userPassword);
  return match;
};
module.exports = {
  formatValues,
  filterValues,
  encryptPassword,
  createAuthToken,
  comparePasswords,
};
