const utility = require('../lib/utility.lib');
const { createQuestion, destroyQuestion } = require('../lib/question.lib');

const {
  filterValues, formatValues,
} = utility;

const postQuestion = async (req, res) => {
  try {
    const rawData = req.body;
    const filteredValues = filterValues(rawData, ['question_text']);
    const data = formatValues(filteredValues);

    const question = await createQuestion({
      question_text: data.question_text,
      user_id: 1,
    });

    if (question) {
      return res.status(200).send({
        message: 'Successfully posted question',
      });
    }
    return res.status(401).send({ message: 'Incorrect email or password' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await destroyQuestion(id);
    return res.status(200).send({
      message: 'Successfully deleted question',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

module.exports = { postQuestion, deleteQuestion };
