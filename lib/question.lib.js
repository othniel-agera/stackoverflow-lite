const models = require('../models/index.model');

const Questions = models.questions;

const createQuestion = async (questionDetails) => {
  const {
    question_text, user_id,
  } = questionDetails;
  let question;
  try {
    question = await Questions.create({
      question_text, user_id,
    });
    return question;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const destroyQuestion = async (question_id, user_id) => {
  try {
    const question = await Questions.findOne({ where: { id: question_id, user_id } });
    if (question) await question.destroy(question_id);
    throw new Error('No question by that id');
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

const fetchQuestion = async (value, raw = false) => Questions.findOne({ where: { ...value }, raw });
const fetchQuestions = async (raw = false) => Questions.findAll({ raw });

module.exports = {
  createQuestion, destroyQuestion, fetchQuestion, fetchQuestions,
};
