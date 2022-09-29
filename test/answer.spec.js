const {
  app, expect, request,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require('./common.spec');
const { createQuestion } = require('../lib/question.lib');
const {
  fetchAnswer, fetchAnswers,
} = require('../lib/answer.lib');
const { createUser, fetchUser, destroyUser } = require('../lib/user.lib');
const { hashPassword } = require('../lib/utility.lib');

describe('Answer Test', () => {
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
    });
    it('Should create post a new answer', async () => {
      const response = await postRequest(`/questions/${question_id}/answers`, token)
        .send({
          answer_text: 'answer',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('answer');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully posted answer');
      expect(resp_data.answer).to.be.an('object');
      answer_id = resp_data.answer.id;
    });
    it('Should edit answer', async () => {
      const response = await putRequest(`/questions/${question_id}/answers/${answer_id}`, token)
        .send({
          answer_text: 'answer_update',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('answer');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully edited answer');
      expect(resp_data.answer).to.be.an('object');
    });
    it('Should get answer', async () => {
      const answer = await fetchAnswer({ id: answer_id }, true);

      expect(answer).to.be.an('object');
      expect(answer).to.have.property('answer_text');
    });
    it('Should get answers', async () => {
      const answers = await fetchAnswers(true);

      expect(answers).to.be.an('array');
    });
    it('Should delete a answer', async () => {
      const response = await deleteRequest(`/questions/${question_id}/answers/${answer_id}`, token).expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully deleted answer');
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
    });
  });

  describe('Negative Tests', () => {
    let token;
    let question_id;
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
    });
    it('Should not post a new answer with empty answer_text', async () => {
      const response = await postRequest(`/questions/${question_id}/answers`, token)
        .send({
          question_text: '',
        })
        .expect(400);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Answer text is required');
    });
    it('Should not edit the answer', async () => {
      const response = await putRequest(`/questions/${question_id}/answers/0`, token)
        .send({
          question_text: '',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Sorry no matching answer');
    });
    it('Should get no answer with id of 0', async () => {
      const response = await getRequest(`/questions/${question_id}/answers/0`, token).expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('No answer with such ID');
    });
    it('Should delete a answer', async () => {
      const response = await deleteRequest(`/questions/${question_id}/answers/0`, token).expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('No answer with such ID');
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
    });
  });
});
