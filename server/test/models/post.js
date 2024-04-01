import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Post', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations', 'programs', 'posts']);
  });

  it('creates a new Post record', async () => {
    assert.deepStrictEqual(await models.Post.count(), 2);

    const record = await models.Post.create({
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
      UserId: 1,
      OrganizationId: 10002,
      ProgramId: 1000,
    });

    assert.deepStrictEqual(await models.Post.count(), 3);
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

  it('finds a Post record by its id', async () => {
    const record = await models.Post.findByPk(100);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.title, 'First Title');
  });

  it('finds multiple Post records', async () => {
    const records = await models.Post.findAll({
      order: [['title', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 2);
    assert.deepStrictEqual(records[0].title, 'First Title');
  });

  it('deletes a Post record', async () => {
    assert.deepStrictEqual(await models.Post.count(), 2);
    const record = await models.Post.findByPk(100);
    await record.destroy();
    assert.deepStrictEqual(await models.Post.count(), 1);
  });
});
