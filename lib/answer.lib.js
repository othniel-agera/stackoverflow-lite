const models = require('../models/index.model');

const Answers = models.answers;

const createAnswer = async (answerDetails) => {
  const {
    answer_text, user_id, question_id,
  } = answerDetails;
  let answer;
  try {
    answer = await Answers.create({
      answer_text, user_id, question_id,
    });
    return answer;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const destroyAnswer = async (answer_id) => {
  try {
    const answer = await Answers.findOne({ where: { id: answer_id } });
    if (answer) await answer.destroy(answer_id);
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

const fetchAnswer = async (value, raw = false) => Answers.findOne({ where: { ...value }, raw });

const fetchAnswers = async (raw = false) => Answers.findAll({ raw });

const fetchAnswersToQuestion = async (
  question_id,
  raw = false,
) => Answers.findAll({ where: { question_id }, raw });

module.exports = {
  createAnswer, destroyAnswer, fetchAnswer, fetchAnswers, fetchAnswersToQuestion,
};
