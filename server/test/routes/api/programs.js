import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/programs', () => {
  let testSession;

  beforeEach(async () => {
    // Organizations has to be before Programs since Programs need an Organization Id
    await helper.loadFixtures(['organizations', 'programs']);
    testSession = session(app);
  });

  it('creates a new Program', async () => {
    const response = await testSession
      .post('/api/programs')
      .send({
        name: 'Dev/Mission CTA Internship',
        description: 'Description for CTA Internship',
        OrganizationId: 10002
      })
      .expect(StatusCodes.CREATED);

    const record = await models.Program.findByPk(response.body.id);
    assert.notDeepStrictEqual(record.id, null);
    assert.notDeepStrictEqual(record.OrganizationId, null);
    assert.deepStrictEqual(record.name, 'Dev/Mission CTA Internship');
    assert.deepStrictEqual(record.description, 'Description for CTA Internship');
    assert.deepStrictEqual(record.OrganizationId, 10002);
  });

  it('updates an existing Program', async () => {
    await testSession
      .patch('/api/programs/1000')
      .send({
        name: 'Dev/Mission & GoodWill Pre-Apprenticeship',
        description: 'Description for Goodwill Pre-Apprenticeship',
        OrganizationId: 10000
      })
      .expect(StatusCodes.OK);
    const record = await models.Program.findByPk(1000);
    assert.deepStrictEqual(record.name, 'Dev/Mission & GoodWill Pre-Apprenticeship');
    assert.deepStrictEqual(record.description, 'Description for Goodwill Pre-Apprenticeship');
    assert.deepStrictEqual(record.OrganizationId, 10000);
  });

  it('deletes an existing Program', async () => {
    await testSession.delete('/api/programs/1001').expect(StatusCodes.OK);

    const record = await models.Cohort.findByPk(1001);
    assert.deepStrictEqual(record, null);
  });

  it('fetch all programs from the Programs table', async () => {
    const response = await testSession.get('/api/programs').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 2);
    // console.log(response.body);
  });

  it('fetch one Program record from the Programs table', async () => {
    const response = await testSession.get('/api/programs/1001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.name, 'Dev/Mission Fellowship');
  });
});
