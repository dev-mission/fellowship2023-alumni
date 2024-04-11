import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import interceptors from '../interceptors.js';

import models from '../../models/index.js';

const router = express.Router();

router.post('/', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Cohort.create(_.pick(req.body, ['cohortNumber', 'graduatedOn', 'year', 'term', 'affiliation']));
    res.status(StatusCodes.CREATED).json(record.toJSON());
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeValidationError') {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  }
});

router.delete('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Cohort.findByPk(req.params.id);
    await record.destroy();
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', interceptors.requireLogin, async (req, res) => {
  const records = await models.Cohort.findAll({
    order: [['cohortNumber', 'DESC']],
  });
  res.json(records.map((r) => r.toJSON()));
});

router.patch('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Cohort.findByPk(req.params.id);
    await record.update(_.pick(req.body, ['cohortNumber', 'graduatedOn', 'year', 'term', 'affiliation']));
    res.json(record.toJSON());
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeValidationError') {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  }
});

router.get('/:id/invites', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Cohort.findByPk(req.params.id);
    if (record) {
      const invites = await record.getInvites({
        where: {
          acceptedAt: null,
          revokedAt: null,
        },
        order: [
          ['firstName', 'ASC'],
          ['lastName', 'ASC'],
          ['email', 'ASC'],
        ],
      });
      res.json(invites.map((i) => i.toJSON()));
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/:id/users', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Cohort.findByPk(req.params.id);
    if (record) {
      const users = await record.getUsers({
        order: [
          ['firstName', 'ASC'],
          ['lastName', 'ASC'],
          ['email', 'ASC'],
        ],
      });
      res.json(users.map((u) => u.toJSON()));
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/:id', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Cohort.findByPk(req.params.id);
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

export default router;
