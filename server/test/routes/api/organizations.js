import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/organizations', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations']);
    testSession = session(app);
    await testSession
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin.user@test.com', password: 'abcd1234' })
      .expect(StatusCodes.OK);
  });

  it('creates a new Organization', async () => {
    const response = await testSession
      .post('/api/organizations')
      .send({
        name: 'Verizon',
        location: 'San Francisco, CA',
        description: 'This is Verizon.',
        url: 'https://www.verizon.com/',
      })
      .expect(StatusCodes.CREATED);

    const record = await models.Organization.findByPk(response.body.id);
    assert.deepStrictEqual(record.name, 'Verizon');
    assert.deepStrictEqual(record.location, 'San Francisco, CA');
    assert.deepStrictEqual(record.description, 'This is Verizon.');
    assert.deepStrictEqual(record.url, 'https://www.verizon.com/');
  });

  it('updates an existing Organization', async () => {
    await testSession
      .patch('/api/organizations/10001')
      .send({
        name: 'Google',
        location: 'San Francisco, CA',
        description: 'This is Google.',
        url: 'https://www.google.com/',
      })
      .expect(StatusCodes.OK);
    const record = await models.Organization.findByPk(10001);
    assert.deepStrictEqual(record.name, 'Google');
    assert.deepStrictEqual(record.location, 'San Francisco, CA');
    assert.deepStrictEqual(record.description, 'This is Google.');
    assert.deepStrictEqual(record.url, 'https://www.google.com/');
  });

  it('deletes an existing Organization', async () => {
    await testSession.delete('/api/organizations/10001').expect(StatusCodes.OK);

    const record = await models.Organization.findByPk(10001);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all cohorts from the Organizations table', async () => {
    const response = await testSession.get('/api/organizations').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 3);
    // console.log(response.body);
  });

  it('fetch one Organization record from the Organizations table', async () => {
    const response = await testSession.get('/api/organizations/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.name, 'Uber');
  });
});
