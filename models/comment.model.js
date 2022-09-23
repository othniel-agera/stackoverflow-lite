module.exports = (sequelize, Datatype) => {
  const comment = sequelize.define(
    'comment',
    {
      comment_text: {
        type: Datatype.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscore: false,
      logging: false,
    },
  );
  comment.associate = (models) => {
    comment.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    comment.belongsTo(models.answers, {
      foreignKey: 'answer_id',
      as: 'answer',
    });
  };

  return comment;
};
