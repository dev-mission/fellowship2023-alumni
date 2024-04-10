import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/surveyresponses', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'surveyresponses']);
    testSession = session(app);
    await testSession
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin.user@test.com', password: 'abcd1234' })
      .expect(StatusCodes.OK);
  });

  it('creates a new SurveyResponse', async () => {
    const response = await testSession
      .post('/api/surveyresponses')
      .send({
        // UserId: 1, (admin.user@test.com is UserId: 1)
        isJob: false,
        isVolunteer: false,
        isOther: true,
        expiresOn: '2061-01-01T00:00:00.000Z',
      })
      .expect(StatusCodes.CREATED);

    const record = await models.SurveyResponse.findByPk(response.body.id);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.UserId, 1);
    assert.deepStrictEqual(record.isJob, false);
    assert.deepStrictEqual(record.isVolunteer, false);
    assert.deepStrictEqual(record.isOther, true);
    assert.deepStrictEqual(record.expiresOn, new Date('2061-01-01T00:00:00.000Z'));
  });

  it('updates an existing SurveyResponse', async () => {
    await testSession
      .patch('/api/surveyresponses/100')
      .send({
        // UserId: 1, (admin.user@test.com is UserId: 1)
        isJob: false,
        isVolunteer: true,
        isOther: true,
        expiresOn: '2071-01-01T00:00:00.000Z',
      })
      .expect(StatusCodes.OK);
    const record = await models.SurveyResponse.findByPk(100);
    assert.deepStrictEqual(record.UserId, 1);
    assert.deepStrictEqual(record.isJob, false);
    assert.deepStrictEqual(record.isVolunteer, true);
    assert.deepStrictEqual(record.isOther, true);
    assert.deepStrictEqual(record.expiresOn, new Date('2071-01-01T00:00:00.000Z'));
  });

  it('deletes an existing SurveyResponse', async () => {
    await testSession.delete('/api/surveyresponses/100').expect(StatusCodes.OK);

    const record = await models.SurveyResponse.findByPk(100);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all surveyresponses from the SurveyResponses table', async () => {
    const response = await testSession.get('/api/surveyresponses').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 3);
    // console.log(response.body);
  });

  it('fetch one SurveyResponse record from the SurveyResponses table', async () => {
    const response = await testSession.get('/api/surveyresponses/100').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.UserId, 1);
  });
});
