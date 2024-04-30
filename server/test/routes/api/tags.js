import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/tags', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'tags']);
    testSession = session(app);
    await testSession
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin.user@test.com', password: 'abcd1234' })
      .expect(StatusCodes.OK);
  });

  it('creates a new Tag', async () => {
    const response = await testSession
      .post('/api/tags')
      .send({
        name: 'Tag 3',
      })
      .expect(StatusCodes.CREATED);

    const record = await models.Tag.findByPk(response.body.id);
    assert.deepStrictEqual(record.name, 'Tag 3');
  });

  it('updates an existing Tag', async () => {
    await testSession
      .patch('/api/tags/10001')
      .send({
        name: 'Tag 4',
      })
      .expect(StatusCodes.OK);
    const record = await models.Tag.findByPk(10001);
    assert.deepStrictEqual(record.name, 'Tag 4');
  });

  it('deletes an existing Tag', async () => {
    await testSession.delete('/api/tags/10001').expect(StatusCodes.OK);

    const record = await models.Tag.findByPk(10001);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all tags from the Tags table', async () => {
    const response = await testSession.get('/api/tags').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 2);
    // console.log(response.body);
  });

  it('fetch one Tag record from the Tags table', async () => {
    const response = await testSession.get('/api/Tags/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.name, 'Tag 2');
  });
});
