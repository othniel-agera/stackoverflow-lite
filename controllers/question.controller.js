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

    return res.status(200).send({
      message: 'Successfully got questions',
      questions,
    });
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

    return res.status(200).send({
      message: 'Successfully posted question',
      question,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const putQuestion = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['question_text']);
    const data = formatValues(filteredValues);

    const question = await fetchQuestion({ user_id, id });
    if (question) {
      question.question_text = data.question_text ? data.question_text : question.question_text;
      question.save();

      return res.status(200).send({
        message: 'Successfully editted question',
        question,
      });
    }
    return res.status(200).send({
      message: 'Sorry no matching question',
    });
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
  getQuestion, getQuestions, postQuestion, putQuestion, deleteQuestion,
};
