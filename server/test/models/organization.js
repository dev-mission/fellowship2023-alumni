import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Organization', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['organizations']);
  });

  it('creates a new Organization record', async () => {
    assert.deepStrictEqual(await models.Organization.count(), 3);

    const record = await models.Organization.create({
      name: 'Verizon',
      location: 'San Francisco, CA',
      description: 'This is Verizon.',
      url: 'https://www.verizon.com/',
    });

    assert.deepStrictEqual(await models.Organization.count(), 4);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.name, 'Verizon');
    assert.deepStrictEqual(record.location, 'San Francisco, CA');
    assert.deepStrictEqual(record.description, 'This is Verizon.');
    assert.deepStrictEqual(record.url, 'https://www.verizon.com/');
  });

  it('finds an Organization record by its id', async () => {
    const record = await models.Organization.findByPk(10000);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.name, 'GoodWill');
  });

  it('finds multiple Organization records', async () => {
    const records = await models.Organization.findAll({
      order: [['name', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 3);
    assert.deepStrictEqual(records[0].name, 'Dev/Mission');
  });

  it('deletes an Organization record', async () => {
    assert.deepStrictEqual(await models.Organization.count(), 3);
    const record = await models.Organization.findByPk(10000);
    await record.destroy();
    assert.deepStrictEqual(await models.Organization.count(), 2);
  });
});
