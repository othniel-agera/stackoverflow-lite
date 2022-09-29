const utility = require('../lib/utility.lib');
const {
  createAnswer, destroyAnswer, fetchAnswer, fetchAnswers, fetchAnswersToQuestion,
} = require('../lib/answer.lib');
const { voteOnAnswer, fetchNumVotesOnAnswer } = require('../lib/vote.lib');

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
    if (!data.answer_text) return res.status(400).json({ message: 'Answer text is required' });
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

const putAnswer = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { question_id, id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['answer_text', 'is_preffered']);
    const data = formatValues(filteredValues);

    const answer = await fetchAnswer({ user_id, question_id, id });
    if (answer) {
      answer.is_preffered = [true, false].includes(data.is_preffered)
        ? data.is_preffered : answer.is_preffered;
      answer.answer_text = data.answer_text ? data.answer_text : answer.answer_text;
      answer.save();

      return res.status(200).send({
        message: 'Successfully edited answer',
        answer,
      });
    }
    return res.status(200).send({
      message: 'Sorry no matching answer',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const getVotesOnAnswer = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const answer = await fetchAnswer({ id }, true);
    if (answer) {
      const { count: upvoteCount } = await fetchNumVotesOnAnswer(id, 'up');
      const { count: downvoteCount } = await fetchNumVotesOnAnswer(id, 'down');

      return res.status(200).send({
        message: 'Successfully fetched answer',
        upvotes: upvoteCount,
        downvotes: downvoteCount,
      });
    }
    return res.status(404).send({
      message: 'Sorry no matching answer',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const postVoteOnAnswer = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['vote_type']);
    const data = formatValues(filteredValues);

    const question = await fetchAnswer({ id }, true);
    if (question) {
      const vote = await voteOnAnswer({ user_id, answer_id: id, vote_type: data.vote_type });

      return res.status(200).send({
        message: 'Successfully voted on a answer',
        vote,
      });
    }
    return res.status(404).send({
      message: 'Sorry no matching answer',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const selectPreferedAnswer = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { question_id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['id']);
    const { id } = formatValues(filteredValues);

    const answer = await fetchAnswer({ user_id, question_id, id });
    if (answer) {
      const prefferedAnswer = await fetchAnswer({ is_preffered: true });
      if (prefferedAnswer && prefferedAnswer.id !== answer.id) {
        prefferedAnswer.is_preffered = false;
        prefferedAnswer.save();
      }
      answer.is_preffered = true;
      answer.save();

      return res.status(200).send({
        message: 'Successfully posted answer',
        answer,
      });
    }
    return res.status(200).send({
      message: 'Sorry no matching answer',
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const { params, user_id } = req;
    const { id } = params;
    const deleted = await destroyAnswer(id, user_id);

    if (deleted) {
      return res.status(200).send({
        message: 'Successfully deleted answer',
      });
    }
    return res.status(404).send({ message: 'No answer with such ID' });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

module.exports = {
  postAnswer,
  deleteAnswer,
  getAnswer,
  getAnswers,
  getAllAnswers,
  putAnswer,
  getVotesOnAnswer,
  postVoteOnAnswer,
  selectPreferedAnswer,
};
