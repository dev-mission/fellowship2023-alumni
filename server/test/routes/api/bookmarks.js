import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/bookmarks', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations', 'programs', 'posts', 'bookmarks']);
    testSession = session(app);
  });

  it('creates a new Bookmark', async () => {
    const response = await testSession
      .post('/api/bookmarks')
      .send({
        UserId: 2,
        PostId: 101,
      })
      .expect(StatusCodes.CREATED);

    const record = await models.Bookmark.findByPk(response.body.id);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.UserId, 2);
    assert.deepStrictEqual(record.PostId, 101);
  });

  it('updates an existing Bookmark', async () => {
    await testSession
      .patch('/api/bookmarks/1')
      .send({
        UserId: 2,
        PostId: 101,
      })
      .expect(StatusCodes.OK);
    const record = await models.Bookmark.findByPk(1);
    assert.deepStrictEqual(record.UserId, 2);
    assert.deepStrictEqual(record.PostId, 101);
  });

  it('deletes an existing Bookmark', async () => {
    await testSession.delete('/api/bookmarks/1').expect(StatusCodes.OK);

    const record = await models.Bookmark.findByPk(1);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all bookmarks from the Bookmarks table', async () => {
    const response = await testSession.get('/api/bookmarks').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 3);
    // console.log(response.body);
  });

  it('fetch one Bookmark record from the Bookmarks table', async () => {
    const response = await testSession.get('/api/bookmarks/1').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.UserId, 1);
  });
});
