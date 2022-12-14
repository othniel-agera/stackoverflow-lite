module.exports = (sequelize, Datatype) => {
  const Question = sequelize.define(
    'questions',
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
  Question.associate = (models) => {
    Question.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Question;
};
