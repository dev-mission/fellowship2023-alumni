import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Bookmark', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations', 'programs', 'posts', 'bookmarks']);
  });

  it('creates a new Bookmark record', async () => {
    assert.deepStrictEqual(await models.Bookmark.count(), 3);

    const record = await models.Bookmark.create({
      UserId: 2,
      PostId: 101,
    });

    assert.deepStrictEqual(await models.Bookmark.count(), 4);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.UserId, 2);
    assert.deepStrictEqual(record.PostId, 101);
  });

  it('finds a Bookmark record by its id', async () => {
    const record = await models.Bookmark.findByPk(1);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.UserId, 1);
  });

  it('finds multiple Bookmark records', async () => {
    const records = await models.Bookmark.findAll({
      order: [['UserId', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 3);
    assert.deepStrictEqual(records[0].UserId, 1);
  });

  it('deletes a Bookmark record', async () => {
    assert.deepStrictEqual(await models.Bookmark.count(), 3);
    const record = await models.Bookmark.findByPk(1);
    await record.destroy();
    assert.deepStrictEqual(await models.Bookmark.count(), 2);
  });
});
