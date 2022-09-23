module.exports = (sequelize, Datatype) => {
  const AnswerVotes = sequelize.define(
    'answer_votes',
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
  AnswerVotes.associate = (models) => {
    AnswerVotes.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
    });
    AnswerVotes.belongsTo(models.answers, {
      foreignKey: 'answer_id',
      as: 'answer',
    });
  };

  return AnswerVotes;
};
