const utility = require('../lib/utility.lib');
const {
  createAnswer, destroyAnswer, fetchAnswer, fetchAnswers, fetchAnswersToQuestion,
} = require('../lib/answer.lib');

const {
  filterValues, formatValues,
} = utility;

const getAnswer = async (req, res) => {
  try {
    const { id, question_id } = req.params;
    const answer = await fetchAnswer({ id, question_id }, true);
    if (answer) {
      return res.status(200).send({
        message: 'Successfully got answer',
        answer,
      });
    }
    return res.status(404).send({ message: 'No answer with such ID' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const getAnswers = async (req, res) => {
  try {
    const { question_id } = req.params;
    const answers = await fetchAnswersToQuestion(question_id, true);
    return res.status(200).send({
      message: 'Successfully got answers',
      answers,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const getAllAnswers = async (req, res) => {
  try {
    const answers = await fetchAnswers(true);
    return res.status(200).send({
      message: 'Successfully got answers',
      answers,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const postAnswer = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { question_id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['answer_text']);
    const data = formatValues(filteredValues);
    const answer = await createAnswer({
      answer_text: data.answer_text,
      user_id,
      question_id,
    });

    return res.status(200).send({
      message: 'Successfully posted answer',
      answer,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    await destroyAnswer(id);
    return res.status(200).send({
      message: 'Successfully deleted answer',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

module.exports = {
  postAnswer, deleteAnswer, getAnswer, getAnswers, getAllAnswers,
};
