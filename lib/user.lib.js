const models = require('../models/index.model');

const Users = models.users;

const createUser = async (userDetails) => {
  const {
    email, username, password, firstname, lastname,
  } = userDetails;
  let user;
  try {
    user = await Users.create({
      email, password, firstname, lastname, username,
    });
    return user;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const deleteUser = async (user_id) => {
  try {
    const user = await Users.findOne({ where: { id: user_id } });
    if (user) await user.destroy(user_id);
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async () => {};

const getUser = async (value) => Users.findOne({ where: { ...value } });

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  getUser,
};
