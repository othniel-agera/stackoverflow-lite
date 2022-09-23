module.exports = (sequelize, Datatype) => {
  const QuestionVotes = sequelize.define(
    'question_votes',
    {
      vote_type: {
        type: Datatype.ENUM({
          values: ['up', 'down'],
        }),
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscore: false,
      logging: false,
    },
  );
  QuestionVotes.associate = (models) => {
    QuestionVotes.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    QuestionVotes.belongsTo(models.questions, {
      foreignKey: 'question_id',
      as: 'question',
    });
  };

  return QuestionVotes;
};
