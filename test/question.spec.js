const {
  app, expect, request,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require('./common.spec');
const { fetchQuestion, fetchQuestions, fetchQuestionsWithMostAnswers } = require('../lib/question.lib');
const { createUser, fetchUser, destroyUser } = require('../lib/user.lib');
const { hashPassword } = require('../lib/utility.lib');

describe('Question Test', () => {
  describe('Positive Tests', () => {
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
      await createUser({ ...user, password });
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .set('Accept', 'application/json');
      token = response.body.accessToken;
    });
    it('Should create post a new question', async () => {
      const response = await postRequest('/questions', token)
        .send({
          question_text: 'question',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('question');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully posted question');
      expect(resp_data.question).to.be.an('object');
      question_id = resp_data.question.id;
    });
    it('Should edit question', async () => {
      const response = await putRequest(`/questions/${question_id}`, token)
        .send({
          question_text: 'question_update',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('question');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully edited question');
      expect(resp_data.question).to.be.an('object');
    });
    it('Should search question', async () => {
      const search_query = 'question';
      const response = await getRequest(`/questions/search/${search_query}?page=0&limit=10`, token).expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('questions');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully got questions.');
      expect(resp_data.questions).to.be.an('array');
    });
    it('Should get question', async () => {
      const question = await fetchQuestion({ id: question_id }, true);

      expect(question).to.be.an('object');
      expect(question).to.have.property('question_text');
    });
    it('Should get questions', async () => {
      const questions = await fetchQuestions(true);

      expect(questions).to.be.an('array');
    });
    it('Should get questions with most answers', async () => {
      const questions = await fetchQuestionsWithMostAnswers(question_id);
      expect(questions).to.be.an('array');
    });
    it('Should delete a question', async () => {
      const response = await deleteRequest(`/questions/${question_id}`, token).expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully deleted question');
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
    });
  });

  describe('Negative Tests', () => {
    let token;
    const user = {
      username: 'kufre',
      firstname: 'Kufre',
      lastname: 'Okon',
      email: `${Date.now()}_example@example.com`,
      password: 'test123',
    };
    before(async () => {
      const password = await hashPassword('test123');
      await createUser({ ...user, password });
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .set('Accept', 'application/json');
      token = response.body.accessToken;
    });
    it('Should not post a new question with empty question_text', async () => {
      const response = await postRequest('/questions', token)
        .send({
          question_text: '',
        })
        .expect(400);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Question text is required');
    });
    it('Should not edit the question', async () => {
      const response = await putRequest('/questions/0', token)
        .send({
          question_text: '',
        })
        .expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Sorry no matching question');
    });
    it('Should return no question', async () => {
      const search_query = await hashPassword('test123');
      const response = await getRequest(`/questions/search/${search_query.slice(1, 10)}?page=0&limit=10`, token).expect(200);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data).to.have.property('questions');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('Successfully got questions.');
      expect(resp_data.questions).to.be.an('array');
      expect(resp_data.questions).to.have.lengthOf(0);
    });
    it('Should get no question with id of 0', async () => {
      const response = await getRequest('/questions/0', token).expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('No question with such ID');
    });
    it('Should delete a question', async () => {
      const response = await deleteRequest('/questions/0', token).expect(404);

      const resp_data = response.body;
      expect(resp_data).to.be.an('object');
      expect(resp_data).to.have.property('message');
      expect(resp_data.message).to.be.an('string');
      expect(resp_data.message).to.equal('No question with such ID');
    });
    after(async () => {
      const userToDelete = await fetchUser({ username: user.username });
      await destroyUser(userToDelete.id, true);
    });
  });
});
