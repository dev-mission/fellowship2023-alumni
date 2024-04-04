import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/posttags', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations', 'programs', 'posts', 'tags', 'posttags']);
    testSession = session(app);
  });

  it('creates a new PostTag', async () => {
    const response = await testSession
      .post('/api/posttags')
      .send({
        PostId: 101,
        TagId: 10001,
      })
      .expect(StatusCodes.CREATED);

    const record = await models.PostTag.findByPk(response.body.id);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.PostId, 101);
    assert.deepStrictEqual(record.TagId, 10001);
  });

  it('updates an existing PostTag', async () => {
    await testSession
      .patch('/api/posttags/10')
      .send({
        PostId: 101,
        TagId: 10001,
      })
      .expect(StatusCodes.OK);
    const record = await models.PostTag.findByPk(10);
    assert.deepStrictEqual(record.PostId, 101);
    assert.deepStrictEqual(record.TagId, 10001);
  });

  it('deletes an existing PostTag', async () => {
    await testSession.delete('/api/posttags/10').expect(StatusCodes.OK);

    const record = await models.Post.findByPk(10);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all posttags from the PostTags table', async () => {
    const response = await testSession.get('/api/posttags').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 3);
    // console.log(response.body);
  });

  it('fetch one PostTag record from the PostTags table', async () => {
    const response = await testSession.get('/api/posttags/10').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.PostId, 100);
  });
});
