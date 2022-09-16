const models = require('../models/index.model');
const utility = require('../lib/utility.lib');

const { filterValues } = utility;

const Users = models.users;
const signup = async (req, res) => {
  try {
    const rawData = req.body;
    const data = filterValues(rawData, ['email', 'username', 'password', 'firstname', 'lastname']);

    const existingEmail = await Users.findOne({
      where: {
        email: data.email,
      },
    });
    if (existingEmail) { return res.json({ Error: 'Email already taken' }); }

    const existingUsername = await Users.findOne({
      where: {
        username: data.username,
      },
    });
    if (existingUsername) { return res.json({ Error: 'Username already taken' }); }

    const user = await models.users.create(data);

    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
};
module.exports = { signup };
