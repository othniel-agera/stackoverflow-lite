module.exports = (sequelize, Datatype) => {
  const Question = sequelize.define(
    'questions',
    {
      question_text: {
        type: Datatype.TEXT,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscore: false,
      logging: false,
    },
  );
  Question.associate = (models) => {
    Question.belongsTo(models.users, {
      foreignKey: 'userid',
      as: 'user',
    });
  };

  return Question;
};
