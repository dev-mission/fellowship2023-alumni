import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Cohort', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['cohorts']);
  });

  it('creates a new Cohort record', async () => {
    assert.deepStrictEqual(await models.Cohort.count(), 2);

    const record = await models.Cohort.create({
          cohortNumber: 3,
          // graduatedOn: '2023-03-03T00:00:00.000Z',
          year: '2023',
          term: 'Summer',
          affiliation: 'Dev/Mission'
    });

    assert.deepStrictEqual(await models.Cohort.count(), 3);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.cohortNumber, 3);
    // assert.deepStrictEqual(record.graduatedOn, '2023-03-03T00:00:00.000Z');
    assert.deepStrictEqual(record.year, '2023');
    assert.deepStrictEqual(record.term, 'Summer');
    assert.deepStrictEqual(record.affiliation, 'Dev/Mission');

  });

  it('finds an Cohort record by its id', async() => {
    const record = await models.Cohort.findByPk(10000);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.cohortNumber, 1);
  });

  it('finds multiple Cohort records', async() => {
    const records = await models.Cohort.findAll({
      order: [['cohortNumber', 'ASC']]
    });
    assert.deepStrictEqual(records.length, 2);
    assert.deepStrictEqual(records[0].cohortNumber, 1);
  });

  it('deletes a Cohort record', async() => {
    assert.deepStrictEqual(await models.Cohort.count(), 2);
    const record = await models.Cohort.findByPk(10000);
    await record.destroy();
    assert.deepStrictEqual(await models.Cohort.count(), 1);
  });
});