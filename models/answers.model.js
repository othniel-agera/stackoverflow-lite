module.exports = (sequelize, Datatype) => {
  const Answer = sequelize.define(
    'answers',
    {
      question_text: {
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
  Answer.associate = (models) => {
    Answer.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Answer.belongsTo(models.questions, {
      foreignKey: 'question_id',
      as: 'question',
    });
  };

  return Answer;
};
