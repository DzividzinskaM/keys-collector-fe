const models = require('../models');

const users = async (req, res) => {
  const users = await models.User.findAll();
  res.send(users);
};

const auth = async (req, res) => {
  const data = req.body;
  const check_user = await models.User.findOne({
    where: {
      username: data.username,
    },
  });

  if (!check_user) {
    const user = await models.User.create({
      username: data.username,
      password: data.password,
    });
    res.sendStatus(201);
  } else {
    res.send('user with the given name already exists');
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const user = models.User.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(200)
  } else {
    req.sendStatus(404)
  }
};

module.exports = {
  users,
  auth,
  deleteUser,
};
