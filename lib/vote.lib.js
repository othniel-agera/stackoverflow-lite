const models = require('../models/index.model');

const QuestionVotes = models.question_votes;
const AnswerVotes = models.answer_votes;

const fetchNumVotesOnQuestion = async (question_id, vote_type) => {
  try {
    if (!['up', 'down'].includes(vote_type)) throw Error('Invalid voting type');
    const { count, rows } = await QuestionVotes.findAndCountAll({
      where: { question_id, vote_type },
    });
    return { count, rows };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const voteOnQuestion = async (votingDetails) => {
  const {
    user_id, question_id, vote_type,
  } = votingDetails;
  try {
    if (!['up', 'down'].includes(vote_type)) throw Error('Invalid voting type');
    const [vote, created] = await QuestionVotes.findOrCreate({
      where: { user_id, question_id },
      defaults: {
        user_id, question_id, vote_type,
      },
    });
    if (!created) vote.vote_type = vote_type;
    vote.save();
    return vote;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const fetchNumVotesOnAnswer = async (answer_id, vote_type) => {
  try {
    if (!['up', 'down'].includes(vote_type)) throw Error('Invalid voting type');
    const { count, rows } = await AnswerVotes.findAndCountAll({
      where: { answer_id, vote_type },
    });
    return { count, rows };
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const voteOnAnswer = async (votingDetails) => {
  const {
    user_id, answer_id, vote_type,
  } = votingDetails;
  try {
    if (!['up', 'down'].includes(vote_type)) throw Error('Invalid voting type');
    const [vote, created] = await AnswerVotes.findOrCreate({
      where: { user_id, answer_id },
      defaults: {
        user_id, answer_id, vote_type,
      },
    });
    if (!created) vote.vote_type = vote_type;
    vote.save();
    return vote;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  fetchNumVotesOnQuestion, voteOnQuestion, fetchNumVotesOnAnswer, voteOnAnswer,
};
