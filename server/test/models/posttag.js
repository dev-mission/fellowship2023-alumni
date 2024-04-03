import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.PostTag', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['users', 'organizations', 'programs', 'posts', 'tags', 'posttags']);
  });

  it('creates a new PostTag record', async () => {
    assert.deepStrictEqual(await models.PostTag.count(), 3);

    const record = await models.PostTag.create({
      PostId: 101,
      TagId: 10001,
    });

    assert.deepStrictEqual(await models.PostTag.count(), 4);
    // assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.PostId, 101);
    assert.deepStrictEqual(record.TagId, 10001);
  });

  it('finds a PostTag record by its id', async () => {
    const record = await models.PostTag.findByPk(10);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.PostId, 100);
  });

  it('finds multiple PostTag records', async () => {
    const records = await models.PostTag.findAll({
      order: [['PostId', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 3);
    assert.deepStrictEqual(records[0].TagId, 10000);
  });

  it('deletes a PostTag record', async () => {
    assert.deepStrictEqual(await models.PostTag.count(), 3);
    const record = await models.PostTag.findByPk(10);
    await record.destroy();
    assert.deepStrictEqual(await models.PostTag.count(), 2);
  });
});
