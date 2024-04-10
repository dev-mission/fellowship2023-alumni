import assert from 'assert';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.SurveyResponse', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['users', 'surveyresponses']);
  });

  it('creates a new SurveyResponse record', async () => {
    assert.deepStrictEqual(await models.SurveyResponse.count(), 3);

    const record = await models.SurveyResponse.create({
      UserId: 2,
      isJob: false,
      isVolunteer: false,
      isOther: true,
      expiresOn: '2061-01-01T00:00:00.000Z',
    });

    assert.deepStrictEqual(await models.SurveyResponse.count(), 4);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.UserId, 2);
    assert.deepStrictEqual(record.isJob, false);
    assert.deepStrictEqual(record.isVolunteer, false);
    assert.deepStrictEqual(record.isOther, true);
    assert.deepStrictEqual(record.expiresOn, new Date('2061-01-01T00:00:00.000Z'));
  });

  it('finds a SurveyResponse record by its id', async () => {
    const record = await models.SurveyResponse.findByPk(100);
    assert.notDeepStrictEqual(record, null);
    assert.deepStrictEqual(record.isJob, true);
  });

  it('finds multiple SurveyResponse records', async () => {
    const records = await models.SurveyResponse.findAll({
      order: [['createdAt', 'ASC']],
    });
    assert.deepStrictEqual(records.length, 3);
    assert.deepStrictEqual(records[0].UserId, 1);
  });

  it('deletes a SurveyResponse record', async () => {
    assert.deepStrictEqual(await models.SurveyResponse.count(), 3);
    const record = await models.SurveyResponse.findByPk(100);
    await record.destroy();
    assert.deepStrictEqual(await models.SurveyResponse.count(), 2);
  });
});
