module.exports = (sequelize, Datatype) => {
  const AnswerComments = sequelize.define(
    'answer_comments',
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
  AnswerComments.associate = (models) => {
    AnswerComments.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    AnswerComments.belongsTo(models.answers, {
      foreignKey: 'answer_id',
      as: 'answer',
    });
  };

  return AnswerComments;
};
