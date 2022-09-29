const {
  app, expect, request,
  postRequest,
  putRequest,
} = require('./common.spec');
const { createQuestion, destroyQuestion } = require('../lib/question.lib');
const { createAnswer, destroyAnswer } = require('../lib/answer.lib');
const { createUser, fetchUser, destroyUser } = require('../lib/user.lib');
const { hashPassword } = require('../lib/utility.lib');
const {
  commentOnQuestion,
  destroyCommentOnQuestion,
  fetchCommentsOnQuestion,
  fetchCommentsOnAnswer,
  commentOnAnswer,
  destroyCommentOnAnswer,
} = require('../lib/comment.lib');

describe('Comment Test', () => {
  describe('Positive Tests', () => {
    let token;
    let user_id;
    let question_id;
    let answer_id;
    const user = {
      username: 'kufre',
      firstname: 'Kufre',
      lastname: 'Okon',
      email: `${Date.now()}_example@example.com`,
      password: 'test123',
    };
    before(async () => {
      const password = await hashPassword('test123');
      const newUser = await createUser({ ...user, password });
      const response = await request(app)
        .post('/auth/login')
        .send(user)
        .set('Accept', 'application/json');
      token = response.body.accessToken;
      user_id = newUser.id;
      const question = await createQuestion({ question_text: 'question_text', user_id }, true);
      question_id = question.dataValues.id;
      const answer = await createAnswer({ answer_text: 'answer_text', user_id }, true);
      answer_id = answer.dataValues.id;
    });
    it('Should comment on a question', async () => {
      const response = await postRequest(`/questions/${question_id}/comments`, token)
        .send({
          comment_text: 'comment',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('comment');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully posted comment');
      expect(resp_data.comment).to.be.an('object');
    });
    it('Should edit a comment on a question', async () => {
      const comment = await commentOnQuestion({
        user_id,
        question_id,
        comment_text: 'comment',
      });
      const response = await putRequest(`/questions/${question_id}/comments/${comment.id}`, token)
        .send({
          comment_text: 'comment_update',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('comment');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully edited comment');
      expect(resp_data.comment).to.be.an('object');
      await destroyCommentOnQuestion(user_id, comment.id);
    });
    it('Should get a comment on a question', async () => {
      const comment = await fetchCommentsOnQuestion(question_id, true);
      expect(comment).to.be.an('array');
    });
    it('Should delete a comment on a question', async () => {
      const comment = await commentOnQuestion({
        user_id,
        question_id,
        comment_text: 'comment',
      });
      const deletedComment = await destroyCommentOnQuestion(user_id, comment.id);
      expect(deletedComment).to.not.be.equal(null);
    });
    it('Should comment on an answer', async () => {
      const response = await postRequest(`/questions/${question_id}/answers/${answer_id}/comments`, token)
        .send({
          comment_text: 'comment',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('comment');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully posted comment');
      expect(resp_data.comment).to.be.an('object');
    });
    it('Should edit a comment on an answer', async () => {
      const comment = await commentOnAnswer({
        user_id,
        answer_id,
        comment_text: 'comment',
      });
      const response = await putRequest(`/questions/${question_id}/answers/${answer_id}/comments/${comment.id}`, token)
        .send({
          comment_text: 'comment_update',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('comment');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully edited comment');
      expect(resp_data.comment).to.be.an('object');
      await destroyCommentOnAnswer(user_id, comment.id);
    });
    it('Should get a comment on an answer', async () => {
      const comment = await fetchCommentsOnAnswer(answer_id, true);
      expect(comment).to.be.an('array');
    });
    it('Should delete a comment on an answer', async () => {
      const comment = await commentOnAnswer({
        user_id,
        question_id,
        comment_text: 'comment',
      });
      const deletedComment = await destroyCommentOnAnswer(user_id, comment.id);
      expect(deletedComment).to.not.be.equal(null);
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
      await destroyQuestion(question_id, userToDelete.id);
      await destroyAnswer(answer_id, userToDelete.id);
    });
  });

  describe('Negative Tests', () => {
    let token;
    let user_id;
    let question_id;
    let answer_id;
    const user = {
      username: 'kufre',
      firstname: 'Kufre',
      lastname: 'Okon',
      email: `${Date.now()}_example@example.com`,
      password: 'test123',
    };
    before(async () => {
      const password = await hashPassword('test123');
      const newUser = await createUser({ ...user, password });
      const response = await request(app)
        .post('/auth/login')
        .send(user)
        .set('Accept', 'application/json');
      token = response.body.accessToken;
      user_id = newUser.id;
      const question = await createQuestion({ question_text: 'question_text', user_id }, true);
      question_id = question.dataValues.id;
      const answer = await createAnswer({ answer_text: 'answer_text', user_id }, true);
      answer_id = answer.dataValues.id;
    });
    it('Should not comment on a question with empty comment_text', async () => {
      const response = await postRequest(`/questions/${question_id}/comments`, token)
        .send({
          comment_text: '',
        })
        .expect(400);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Comment text is required');
    });
    it('Should not edit a comment on a question with invalid id', async () => {
      const response = await putRequest(`/questions/${question_id}/comments/0`, token)
        .send({
          comment_text: 'comment_update',
        })
        .expect(500);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('error');
      expect(resp_data.error).to.be.an('string');
      expect(resp_data.error).to.equal('Sorry no matching comment');
    });
    it('Should not comment on a answer with empty comment_text', async () => {
      const response = await postRequest(`/questions/${question_id}/answers/${answer_id}/comments`, token)
        .send({
          comment_text: '',
        })
        .expect(400);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Comment text is required');
    });
    it('Should not edit a comment on an answer with invalid id', async () => {
      const response = await putRequest(`/questions/${question_id}/answers/${answer_id}/comments/0`, token)
        .send({
          comment_text: 'comment_update',
        })
        .expect(500);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('error');
      expect(resp_data.error).to.be.an('string');
      expect(resp_data.error).to.equal('Sorry no matching comment');
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
      await destroyQuestion(question_id, userToDelete.id);
      await destroyAnswer(answer_id, userToDelete.id);
    });
  });
});
