import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/cohorts', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['cohorts']);
    testSession = session(app);
  });

  it('creates a new Cohort', async() => {
    const response = await testSession.post('/api/cohorts')
      .send({ 
        cohortNumber: 3,
        // graduatedOn: '2023-03-03T00:00:00.000Z',
        year: '2023',
        term: 'Summer',
        affiliation: 'Dev/Mission',
        })
      .expect(StatusCodes.CREATED);

    const record = await models.Cohort.findByPk(response.body.id);
    assert.deepStrictEqual(record.cohortNumber, 3);
    // assert.deepStrictEqual(record.graduatedOn, '2023-03-03T00:00:00.000Z');
    assert.deepStrictEqual(record.year, '2023');
    assert.deepStrictEqual(record.term, 'Summer');
    assert.deepStrictEqual(record.affiliation, 'Dev/Mission');
  });

  it('updates an existing Cohort', async() => {
    await testSession.patch('/api/cohorts/10001')
      .send({
        cohortNumber: 4,
        // graduatedOn: '2024-04-04T00:00:00.000Z',
        year: '2024',
        term: 'Fall',
        affiliation: 'Goodwill',
        })
      .expect(StatusCodes.OK);
    const record = await models.Cohort.findByPk(10001);
    assert.deepStrictEqual(record.cohortNumber, 4);
    // assert.deepStrictEqual(record.graduatedOn, '2024-04-04T00:00:00.000Z');
    assert.deepStrictEqual(record.year, '2024');
    assert.deepStrictEqual(record.term, 'Fall');
    assert.deepStrictEqual(record.affiliation, 'Goodwill');
  })

  it('deletes an existing Cohort', async() => {
    await testSession.delete('/api/cohorts/10001')
      .expect(StatusCodes.OK);

      const record = await models.Cohort.findByPk(10001);
      assert.deepStrictEqual(record, null);
  })

  it('fetch all cohorts from the Cohorts table', async() => {
    const response = await testSession.get('/api/cohorts').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 2);
    // console.log(response.body);
  });

  it('fetch one Cohort record from the Cohorts table', async() => {
    const response = await testSession.get('/api/cohorts/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.cohortNumber, 2);
  });

});