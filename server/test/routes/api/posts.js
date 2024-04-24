import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/posts', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations', 'programs', 'posts']);
    testSession = session(app);
    await testSession
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin.user@test.com', password: 'abcd1234' })
      .expect(StatusCodes.OK);
  });

  it('creates a new Post', async () => {
    const response = await testSession
      .post('/api/posts')
      .send({
        postedOn: '2023-01-01T00:00:00.000Z',
        expiresOn: '2033-01-01T00:00:00.000Z',
        title: 'Created Title',
        description: 'This is the created description.',
        applicationUrl: 'https://createdpost.com/',
        isPaidOpportunity: true,
        entryCost: 'Free',
        referredBy: 'Leo Sosa',
        isRecurring: true,
        isArchived: true,
        workLocation: 'San Francisco, CA',
        // UserId: 1, (admin.user@test.com is UserId: 1)
        OrganizationId: 10002,
        ProgramId: 1000,
      })
      .expect(StatusCodes.CREATED);

    const record = await models.Post.findByPk(response.body.id);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.postedOn, new Date('2023-01-01T00:00:00.000Z'));
    assert.deepStrictEqual(record.expiresOn, new Date('2033-01-01T00:00:00.000Z'));
    assert.deepStrictEqual(record.title, 'Created Title');
    assert.deepStrictEqual(record.description, 'This is the created description.');
    assert.deepStrictEqual(record.applicationUrl, 'https://createdpost.com/');
    assert.deepStrictEqual(record.isPaidOpportunity, true);
    assert.deepStrictEqual(record.entryCost, 'Free');
    assert.deepStrictEqual(record.referredBy, 'Leo Sosa');
    assert.deepStrictEqual(record.isRecurring, true);
    assert.deepStrictEqual(record.isArchived, true);
    assert.deepStrictEqual(record.workLocation, 'San Francisco, CA');
    assert.deepStrictEqual(record.UserId, 1);
    assert.deepStrictEqual(record.OrganizationId, 10002);
    assert.deepStrictEqual(record.ProgramId, 1000);
  });

  it('updates an existing Post', async () => {
    await testSession
      .patch('/api/posts/100')
      .send({
        postedOn: '2023-03-03T00:00:00.000Z',
        expiresOn: '2033-03-03T00:00:00.000Z',
        title: 'Updated Title',
        description: 'This is the updated description.',
        applicationUrl: 'https://updatedpost.com/',
        isPaidOpportunity: true,
        entryCost: 'Free',
        referredBy: 'Leo Sosa',
        isRecurring: true,
        isArchived: true,
        workLocation: 'San Francisco, CA',
        // UserId: 1, (admin.user@test.com is UserId: 1)
        OrganizationId: 10002,
        ProgramId: 1000,
      })
      .expect(StatusCodes.OK);
    const record = await models.Post.findByPk(100);
    assert.deepStrictEqual(record.postedOn, new Date('2023-03-03T00:00:00.000Z'));
    assert.deepStrictEqual(record.expiresOn, new Date('2033-03-03T00:00:00.000Z'));
    assert.deepStrictEqual(record.title, 'Updated Title');
    assert.deepStrictEqual(record.description, 'This is the updated description.');
    assert.deepStrictEqual(record.applicationUrl, 'https://updatedpost.com/');
    assert.deepStrictEqual(record.isPaidOpportunity, true);
    assert.deepStrictEqual(record.entryCost, 'Free');
    assert.deepStrictEqual(record.referredBy, 'Leo Sosa');
    assert.deepStrictEqual(record.isRecurring, true);
    assert.deepStrictEqual(record.isArchived, true);
    assert.deepStrictEqual(record.workLocation, 'San Francisco, CA');
    assert.deepStrictEqual(record.UserId, 1);
    assert.deepStrictEqual(record.OrganizationId, 10002);
    assert.deepStrictEqual(record.ProgramId, 1000);
  });

  it('deletes an existing Post', async () => {
    await testSession.delete('/api/posts/100').expect(StatusCodes.OK);

    const record = await models.Post.findByPk(100);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all posts from the Posts table', async () => {
    const response = await testSession.get('/api/posts').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 2);
    // console.log(response.body);
  });

  it('fetch one Post record from the Posts table', async () => {
    const response = await testSession.get('/api/posts/100').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.title, 'First Title');
  });
});
