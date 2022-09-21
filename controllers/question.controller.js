const utility = require('../lib/utility.lib');
const {
  createQuestion, destroyQuestion, fetchQuestion, fetchQuestions,
} = require('../lib/question.lib');

const {
  filterValues, formatValues,
} = utility;

const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await fetchQuestion({ id }, true);
    if (question) {
      return res.status(200).send({
        message: 'Successfully got question',
        question,
      });
    }
    return res.status(404).send({ message: 'No question with such ID' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await fetchQuestions(true);

    if (questions) {
      return res.status(200).send({
        message: 'Successfully got questions',
        questions,
      });
    }
    return res.status(404).send({ message: 'No question in DB' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const postQuestion = async (req, res) => {
  try {
    const { body, user_id } = req;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['question_text']);
    const data = formatValues(filteredValues);

    const question = await createQuestion({
      question_text: data.question_text,
      user_id,
    });

    if (question) {
      return res.status(200).send({
        message: 'Successfully posted question',
      });
    }
    return res.status(401).send({ message: 'Something went wrong' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await destroyQuestion(id);

    if (deleted) {
      return res.status(200).send({
        message: 'Successfully deleted question',
      });
    }
    return res.status(404).send({ message: 'No question with such ID' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

module.exports = {
  getQuestion, getQuestions, postQuestion, deleteQuestion,
};
