import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Program', () => {
  beforeEach(async () => {
    // Organizations has to be before Programs since Programs need an Organization Id
    await helper.loadFixtures(['organizations', 'programs']);
  });

  it('creates a new Program record', async () => {
    assert.deepStrictEqual(await models.Program.count(), 2);

    const record = await models.Program.create({
      name: 'Dev/Mission CTA Internship',
      description: 'Description for CTA Internship',
      OrganizationId: 10002,
    });

    assert.deepStrictEqual(await models.Program.count(), 3);
    assert.notDeepStrictEqual(record.id, null);
    assert.notDeepStrictEqual(record.OrganizationId, null);
    assert.deepStrictEqual(record.name, 'Dev/Mission CTA Internship');
    assert.deepStrictEqual(record.description, 'Description for CTA Internship');
    assert.deepStrictEqual(record.OrganizationId, 10002);
  });

  it('finds a Program record by its id', async () => {
    const record = await models.Program.findByPk(1000);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.name, 'Dev/Mission Pre-Apprenticeship');
  });

  it('finds multiple Cohort records', async () => {
    const records = await models.Program.findAll({
      order: [['name', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 2);
    assert.deepStrictEqual(records[0].name, 'Dev/Mission Fellowship');
  });

  it('deletes a Program record', async () => {
    assert.deepStrictEqual(await models.Program.count(), 2);
    const record = await models.Program.findByPk(1000);
    await record.destroy();
    assert.deepStrictEqual(await models.Program.count(), 1);
  });
});
