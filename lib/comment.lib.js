const models = require('../models/index.model');

const QuestionComments = models.question_comments;
const AnswerComments = models.answer_comments;

// Comments on question related
const fetchCommentOnQuestion = async (value, raw = false) => QuestionComments.findOne(
  {
    where: { ...value }, raw,
  },
);

const fetchCommentsOnQuestion = async (question_id, raw = false) => {
  try {
    const comments = await QuestionComments.findAll({
      where: { question_id },
      raw,
    });
    return comments;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const commentOnQuestion = async (commentDetails) => {
  const {
    user_id, question_id, comment_text,
  } = commentDetails;
  try {
    const comment = await QuestionComments.create({ user_id, question_id, comment_text });
    return comment;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const editCommentOnQuestion = async (commentDetails) => {
  const {
    user_id, id, comment_text,
  } = commentDetails;
  try {
    const comment = await fetchCommentOnQuestion({ user_id, id });
    if (comment) {
      comment.comment_text = comment_text;
      await comment.save();
      return comment;
    }
    throw new Error('Sorry no matching comment');
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const destroyCommentOnQuestion = async (user_id, id) => {
  try {
    const comment = await QuestionComments.findOne({ where: { user_id, id } });
    if (comment) return await comment.destroy(id);
    throw new Error('Sorry no matching comment');
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

// Comments on amswer related
const fetchAnswerComment = async (value, raw = false) => AnswerComments.findOne(
  {
    where: { ...value }, raw,
  },
);

const fetchCommentsOnAnswer = async (answer_id) => {
  try {
    const comments = await AnswerComments.findAll({
      where: { answer_id },
    });
    return comments;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const commentOnAnswer = async (commentDetails) => {
  const {
    user_id, answer_id, comment_text,
  } = commentDetails;
  try {
    const comment = await AnswerComments.create({ user_id, answer_id, comment_text });
    return comment;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const editCommentOnAnswer = async (commentDetails) => {
  const {
    user_id, id, comment_text,
  } = commentDetails;
  try {
    const comment = await fetchAnswerComment({ user_id, id });
    if (comment) {
      comment.comment_text = comment_text;
      await comment.save();
      return comment;
    }
    throw new Error('Sorry no matching comment');
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const destroyCommentOnAnswer = async (user_id, id) => {
  try {
    const comment = await AnswerComments.findOne({ where: { user_id, id } });
    if (comment) return await comment.destroy(id);
    throw new Error('Sorry no matching comment');
  } catch (error) {
    console.log(error);
    throw new Error(`${error.message}`);
  }
};

// All Comments
const fetchAllComments = async (raw = false) => QuestionComments.findAll({ raw });

module.exports = {
  fetchCommentOnQuestion,
  fetchCommentsOnQuestion,
  commentOnQuestion,
  editCommentOnQuestion,
  destroyCommentOnQuestion,
  fetchAnswerComment,
  fetchCommentsOnAnswer,
  commentOnAnswer,
  editCommentOnAnswer,
  destroyCommentOnAnswer,
  fetchAllComments,
};
