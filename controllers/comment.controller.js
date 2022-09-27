const utility = require('../lib/utility.lib');
const {
  fetchCommentsOnQuestion,
  fetchCommentsOnAnswer,
  commentOnQuestion,
  commentOnAnswer,
  editCommentOnQuestion,
  editCommentOnAnswer,
  destroyCommentOnQuestion,
  destroyCommentOnAnswer,
} = require('../lib/comment.lib');

const {
  filterValues, formatValues,
} = utility;

// Question related
const getCommentOnQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const comments = await fetchCommentsOnQuestion(question_id, true);

    return res.status(200).send({
      message: 'Successfully got comments',
      comments,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const postCommentOnQuestion = async (req, res) => {
  try {
    const { body, params, user_id } = req;
    const { question_id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['comment_text']);
    const data = formatValues(filteredValues);

    const comment = await commentOnQuestion({
      comment_text: data.comment_text,
      user_id,
      question_id,
    });

    return res.status(200).send({
      message: 'Successfully posted comment',
      comment,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const putCommentOnQuestion = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['comment_text']);
    const data = formatValues(filteredValues);
    const comment = await editCommentOnQuestion({
      user_id, id, comment_text: data.comment_text,
    });
    return res.status(200).send({
      message: 'Successfully edited question',
      comment,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const deleteCommentOnQuestion = async (req, res) => {
  try {
    const { user_id, params } = req;
    const { id } = params;

    const comment = await destroyCommentOnQuestion(user_id, id);
    return res.status(200).send({
      message: 'Successfully edited comment',
      comment,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

// Answer related
const getCommentOnAnswer = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const comments = await fetchCommentsOnAnswer(answer_id, true);

    return res.status(200).send({
      message: 'Successfully got comments',
      comments,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const postCommentOnAnswer = async (req, res) => {
  try {
    const { body, params, user_id } = req;
    const { answer_id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['comment_text']);
    const data = formatValues(filteredValues);

    const comment = await commentOnAnswer({
      comment_text: data.comment_text,
      user_id,
      answer_id,
    });

    return res.status(200).send({
      message: 'Successfully posted comment',
      comment,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const putCommentOnAnswer = async (req, res) => {
  try {
    const { user_id, params, body } = req;
    const { id } = params;
    const rawData = body;
    const filteredValues = filterValues(rawData, ['comment_text']);
    const data = formatValues(filteredValues);
    const comment = await editCommentOnAnswer({
      user_id, id, comment_text: data.comment_text,
    });
    return res.status(200).send({
      message: 'Successfully edited answer',
      comment,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

const deleteCommentOnAnswer = async (req, res) => {
  try {
    const { user_id, params } = req;
    const { id } = params;

    const comment = await destroyCommentOnAnswer(user_id, id);
    return res.status(200).send({
      message: 'Successfully edited comment',
      comment,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message || error });
  }
};

module.exports = {
  getCommentOnQuestion,
  postCommentOnQuestion,
  putCommentOnQuestion,
  deleteCommentOnQuestion,
  getCommentOnAnswer,
  postCommentOnAnswer,
  putCommentOnAnswer,
  deleteCommentOnAnswer,
};
