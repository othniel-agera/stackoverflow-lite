const utility = require('../lib/utility.lib');
const { createAnswer, destroyAnswer } = require('../lib/answer.lib');

const {
  filterValues, formatValues,
} = utility;

const postAnswer = async (req, res) => {
  try {
    const rawData = req.body;
    const filteredValues = filterValues(rawData, ['answer_text']);
    const data = formatValues(filteredValues);

    const answer = await createAnswer({
      answer_text: data.answer_text,
      user_id: 1,
      question_id: 1,
    });

    if (answer) {
      return res.status(200).send({
        message: 'Successfully posted answer',
      });
    }
    return res.status(401).send({ message: 'Something went terrible wrong' });
  } catch (error) {
    console.log(error);
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

module.exports = { postAnswer, deleteAnswer };
