const { Op } = require('sequelize');
const { sequelize } = require('../models/index.model');
const models = require('../models/index.model');

const { where, fn, col } = models.sequelize;
const Questions = models.questions;
const Answers = models.answers;

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

const destroyQuestion = async (id, user_id) => {
  try {
    const question = await Questions.findOne({ where: { id, user_id } });
    if (question) return await question.destroy(id);
    return null;
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

const fetchQuestion = async (value, raw = false) => Questions.findOne({ where: { ...value }, raw });
const fetchQuestions = async (raw = false) => Questions.findAll({ raw });

const searchQuestions = async (query, raw, page = 1, limit = 10) => {
  try {
    return await Questions.findAndCountAll({
      where: where(fn('lower', col('question_text')), {
        [Op.like]: `%${query}%`,
      }),
      offset: limit * page,
      limit,
      raw,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

const fetchQuestionsWithMostAnswers = async () => {
  try {
    return Answers.findAll({
      attributes: [
        'question.question_text',
        [
          sequelize.fn('COUNT', sequelize.col('question.id')), 'no_answers',
        ],
      ],
      group: ['question.id'],
      include: [
        {
          model: models.questions,
          required: true,
          as: 'question',
          attributes: ['question_text'],
        }],
      order: [[sequelize.literal('no_answers'), 'DESC']],
      nest: false,
    });
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

module.exports = {
  createQuestion,
  destroyQuestion,
  fetchQuestion,
  fetchQuestions,
  searchQuestions,
  fetchQuestionsWithMostAnswers,
};
