const models = require('../models/index.model');

module.exports = async (req, res) => {
  try {
    const data = req.body;

    const existingEmail = await models.users.findOne({ where: { email: data.email } });
    if (existingEmail) { return res.json({ Error: 'Email already taken' }); }

    const user = await models.users.create(data);

    return res.json(user);
  } catch (err) {
    return res.json(err);
  }
};
