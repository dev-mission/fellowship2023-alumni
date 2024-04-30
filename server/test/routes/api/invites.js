import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import nodemailerMock from 'nodemailer-mock';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/invites', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'cohorts', 'invites']);
    testSession = session(app);
    await testSession
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin.user@test.com', password: 'abcd1234' })
      .expect(StatusCodes.OK);
  });

  describe('GET /', () => {
    it('returns a list of sent invites', async () => {
      const response = await testSession.get('/api/invites').set('Accept', 'application/json').expect(StatusCodes.OK);
      assert.deepStrictEqual(response.body.length, 2);
      assert.deepStrictEqual(response.body[0].lastName, 'User 2');
      assert.deepStrictEqual(response.body[1].lastName, 'User 1');
    });
  });

  describe('POST /', () => {
    it('creates and sends a new Invite', async () => {
      const response = await testSession
        .post('/api/invites')
        .set('Accept', 'application/json')
        .send({ firstName: 'Invitee', lastName: 'Name', email: 'invitee.name@test.com', message: 'Welcome!', CohortId: 10000 })
        .expect(StatusCodes.CREATED);

      assert(response.body?.id);
      const invite = await models.Invite.findByPk(response.body.id);
      assert(invite);
      assert.deepStrictEqual(invite.firstName, 'Invitee');
      assert.deepStrictEqual(invite.lastName, 'Name');
      assert.deepStrictEqual(invite.email, 'invitee.name@test.com');
      assert.deepStrictEqual(invite.message, 'Welcome!');
      assert.deepStrictEqual(invite.CohortId, 10000);
      assert.deepStrictEqual(invite.CreatedByUserId, 1);

      const emails = nodemailerMock.mock.getSentMail();
      assert.deepStrictEqual(emails.length, 1);
      assert.deepStrictEqual(emails[0].subject, `Your invitation to ${process.env.VITE_SITE_TITLE}`);
      assert.deepStrictEqual(emails[0].to, '"Invitee Name" <invitee.name@test.com>');
    });
  });

  describe('POST /bulk', () => {
    it('creates and sends multiple Invites', async () => {
      const response = await testSession
        .post('/api/invites/bulk')
        .set('Accept', 'application/json')
        .send({
          recipients: `invitee.1@test.com
invitee.2@test.com
John Doe <john.doe@test.com>, "Jane M. Doe" <jane.m.doe@test.com>`,
          message: 'Welcome!',
          CohortId: 10000,
        })
        .expect(StatusCodes.CREATED);

      assert.deepStrictEqual(response.body?.length, 4);

      const invite = await models.Invite.findByPk(response.body[0].id);
      assert.deepStrictEqual(invite.CohortId, 10000);

      const emails = nodemailerMock.mock.getSentMail();
      assert.deepStrictEqual(emails.length, 4);

      const tos = emails.map((e) => e.to).sort();
      assert.deepStrictEqual(tos, [
        '"Jane M. Doe" <jane.m.doe@test.com>',
        '"John Doe" <john.doe@test.com>',
        'invitee.1@test.com',
        'invitee.2@test.com',
      ]);
    });
  });

  describe('GET /:id', () => {
    it('returns an Invite by id', async () => {
      const response = await testSession
        .get('/api/invites/14a500b7-f14c-48cd-b815-3685a8b54370')
        .set('Accept', 'application/json')
        .expect(StatusCodes.OK);
      const data = { ...response.body };
      delete data.updatedAt;
      assert.deepStrictEqual(data, {
        id: '14a500b7-f14c-48cd-b815-3685a8b54370',
        firstName: 'Invited',
        lastName: 'User 1',
        email: 'invited.user.1@test.com',
        message: 'This is an invitation to Invited User 1.',
        createdAt: '2022-01-29T22:58:56.000Z',
        CohortId: 10000,
        CreatedByUserId: 1,
        acceptedAt: null,
        AcceptedByUserId: null,
        revokedAt: null,
        RevokedByUserId: null,
      });
    });
  });

  describe('DELETE /:id', () => {
    it('revokes an Invite by id', async () => {
      await testSession
        .delete('/api/invites/14a500b7-f14c-48cd-b815-3685a8b54370')
        .set('Accept', 'application/json')
        .expect(StatusCodes.OK);
      const invite = await models.Invite.findByPk('14a500b7-f14c-48cd-b815-3685a8b54370');
      assert(invite.revokedAt);
      assert.deepStrictEqual(invite.RevokedByUserId, 1);
    });
  });

  describe('POST /:id/accept', () => {
    it('accepts an Invite by id, creating a new User', async () => {
      const response = await testSession
        .post('/api/invites/14a500b7-f14c-48cd-b815-3685a8b54370/accept')
        .set('Accept', 'application/json')
        .send({
          firstName: 'Accepting',
          lastName: 'User',
          username: 'acceptinguser',
          email: 'accepting.user@test.com',
          password: 'abcd1234',
          confirmPassword: 'abcd1234',
        })
        .expect(StatusCodes.CREATED);
      const { id } = response.body;
      assert(id);
      assert.deepStrictEqual(response.body, {
        id,
        firstName: 'Accepting',
        lastName: 'User',
        email: 'accepting.user@test.com',
        isAdmin: false,
        picture: null,
        pictureUrl: null,
        roles: null,
        bio: null,
        userName: null,
        CohortId: 10000,
        linkedin: null,
        currentPosition: null,
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
      });

      const user = await models.User.findByPk(id);
      assert.deepStrictEqual(user.CohortId, 10000);

      const invite = await models.Invite.findByPk('14a500b7-f14c-48cd-b815-3685a8b54370');
      assert(invite.acceptedAt);
      assert.deepStrictEqual(invite.AcceptedByUserId, id);
    });
  });
});
