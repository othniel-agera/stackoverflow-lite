const {
  app, expect, request,
  getRequest,
  postRequest,
} = require('./common.spec');
const { createQuestion, destroyQuestion } = require('../lib/question.lib');
const { createAnswer, destroyAnswer } = require('../lib/answer.lib');
const { createUser, fetchUser, destroyUser } = require('../lib/user.lib');
const { hashPassword } = require('../lib/utility.lib');

describe('Vote Test', () => {
  describe('Positive Tests', () => {
    let token;
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
      const question = await createQuestion({ question_text: 'question_text', user_id: newUser.id }, true);
      question_id = question.dataValues.id;
      const answer = await createAnswer({ answer_text: 'answer_text', user_id: newUser.id }, true);
      answer_id = answer.dataValues.id;
    });
    it('Should upvote on a question', async () => {
      const response = await postRequest(`/questions/${question_id}/votes`, token)
        .send({
          vote_type: 'up',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('vote');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully voted on a question');
      expect(resp_data.vote).to.be.an('object');
    });
    it('Should downvote on a question', async () => {
      const response = await postRequest(`/questions/${question_id}/votes`, token)
        .send({
          vote_type: 'down',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('vote');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully voted on a question');
      expect(resp_data.vote).to.be.an('object');
    });
    it('Should upvote on a answer', async () => {
      const response = await postRequest(`/questions/${question_id}/answers/${answer_id}/votes`, token)
        .send({
          vote_type: 'up',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('vote');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully voted on a answer');
      expect(resp_data.vote).to.be.an('object');
    });
    it('Should downvote on an answer', async () => {
      const response = await postRequest(`/questions/${question_id}/answers/${answer_id}/votes`, token)
        .send({
          vote_type: 'down',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('vote');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully voted on a answer');
      expect(resp_data.vote).to.be.an('object');
    });
    it('Should get vote on question', async () => {
      const response = await getRequest(`/questions/${question_id}/votes`, token)
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('upvotes');
      expect(resp_data).to.have.property('downvotes');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully fetched question');
      expect(resp_data.upvotes).to.be.an('number');
      expect(resp_data.downvotes).to.be.an('number');
    });
    it('Should get vote on answer', async () => {
      const response = await getRequest(`/questions/${question_id}/answers/${answer_id}/votes`, token)
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('upvotes');
      expect(resp_data).to.have.property('downvotes');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully fetched answer');
      expect(resp_data.upvotes).to.be.an('number');
      expect(resp_data.downvotes).to.be.an('number');
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
      const question = await createQuestion({ question_text: 'question_text', user_id: newUser.id }, true);
      question_id = question.dataValues.id;
      const answer = await createAnswer({ answer_text: 'answer_text', user_id: newUser.id }, true);
      answer_id = answer.dataValues.id;
    });
    it('Should not vote on a wrong question', async () => {
      const response = await postRequest('/questions/0/votes', token)
        .send({
          vote_type: 'up',
        })
        .expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Sorry no matching question');
    });
    it('Should not vote on a question with wrong vote type', async () => {
      const response = await postRequest(`/questions/${question_id}/votes`, token)
        .send({
          vote_type: 'updown',
        })
        .expect(500);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('error');
      expect(resp_data.error).to.be.an('string');
      expect(resp_data.error).to.equal('Invalid voting type');
    });
    it('Should not vote on a wrong answer', async () => {
      const response = await postRequest(`/questions/${question_id}/answers/0/votes`, token)
        .send({
          vote_type: 'up',
        })
        .expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Sorry no matching answer');
    });
    it('Should not vote on a answer with wrong vote type', async () => {
      const response = await postRequest(`/questions/${question_id}/answers/${answer_id}/votes`, token)
        .send({
          vote_type: 'updown',
        })
        .expect(500);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('error');
      expect(resp_data.error).to.be.an('string');
      expect(resp_data.error).to.equal('Invalid voting type');
    });
    it('Should not get vote on question with invalid question id', async () => {
      const response = await getRequest('/questions/0/votes', token)
        .expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Sorry no matching question');
    });
    it('Should not get vote on answer with invalid answer id', async () => {
      const response = await getRequest(`/questions/${question_id}/answers/0/votes`, token)
        .expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Sorry no matching answer');
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
      await destroyQuestion(question_id, userToDelete.id);
      await destroyAnswer(answer_id, userToDelete.id);
    });
  });
});
