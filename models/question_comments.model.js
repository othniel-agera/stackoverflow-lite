module.exports = (sequelize, Datatype) => {
  const QuestionComments = sequelize.define(
    'question_comments',
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
  QuestionComments.associate = (models) => {
    QuestionComments.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    QuestionComments.belongsTo(models.questions, {
      foreignKey: 'question_id',
      as: 'question',
    });
  };

  return QuestionComments;
};
