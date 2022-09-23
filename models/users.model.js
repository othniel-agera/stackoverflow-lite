module.exports = (sequelize, Datatype) => {
  const User = sequelize.define(
    'users',
    {
      username: {
        type: Datatype.STRING(50),
        unique: true,
      },
      email: {
        type: Datatype.STRING(120),
        unique: true,
      },
      firstname: {
        type: Datatype.STRING(120),
      },
      lastname: {
        type: Datatype.STRING(120),
      },
      password: {
        type: Datatype.STRING(512),
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscore: false,
      logging: false,
    },
  );
  User.associate = (models) => {
    User.hasMany(models.questions, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.answers, {
      foreignKey: 'user_id',
    });
  };
  return User;
};
