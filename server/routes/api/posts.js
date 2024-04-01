import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import models from '../../models/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const record = await models.Post.create(_.pick(req.body, ['postedOn', 'expiresOn', 'title', 'description', 'applicationUrl', 'isPaidOpportunity', 'entryCost', 'referredBy', 'isRecurring', 'isArchived', 'workLocation', 'UserId', 'OrganizationId', 'ProgramId']));
    res.status(StatusCodes.CREATED).json(record.toJSON());
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const record = await models.Post.findByPk(req.params.id);
    await record.destroy();
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', async (req, res) => {
  const records = await models.Post.findAll();
  res.json(records.map((r) => r.toJSON()));
});

router.patch('/:id', async (req, res) => {
  try {
    const record = await models.Post.findByPk(req.params.id);
    await record.update(_.pick(req.body, ['postedOn', 'expiresOn', 'title', 'description', 'applicationUrl', 'isPaidOpportunity', 'entryCost', 'referredBy', 'isRecurring', 'isArchived', 'workLocation', 'UserId', 'OrganizationId', 'ProgramId']));
    res.json(record.toJSON());
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const record = await models.Post.findByPk(req.params.id);
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

export default router;
