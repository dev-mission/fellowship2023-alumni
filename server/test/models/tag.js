import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Tag', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['tags']);
  });

  it('creates a new Tag record', async () => {
    assert.deepStrictEqual(await models.Tag.count(), 2);

    const record = await models.Tag.create({
      name: 'Tag 3',
    });

    assert.deepStrictEqual(await models.Tag.count(), 3);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.name, 'Tag 3');
  });

  it('finds a Tag record by its id', async () => {
    const record = await models.Tag.findByPk(10000);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.name, 'Tag 1');
  });

  it('finds multiple Tag records', async () => {
    const records = await models.Tag.findAll({
      order: [['name', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 2);
    assert.deepStrictEqual(records[0].name, 'Tag 1');
  });

  it('deletes a Tag record', async () => {
    assert.deepStrictEqual(await models.Tag.count(), 2);
    const record = await models.Tag.findByPk(10000);
    await record.destroy();
    assert.deepStrictEqual(await models.Tag.count(), 1);
  });
});
