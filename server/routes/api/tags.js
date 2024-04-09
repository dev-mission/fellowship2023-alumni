import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import interceptors from '../interceptors.js';

import models from '../../models/index.js';

const router = express.Router();

router.post('/', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Tag.create(_.pick(req.body, ['name']));
    res.status(StatusCodes.CREATED).json(record.toJSON());
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Tag.findByPk(req.params.id);
    await record.destroy();
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', interceptors.requireLogin, async (req, res) => {
  const records = await models.Tag.findAll();
  res.json(records.map((r) => r.toJSON()));
});

router.patch('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Tag.findByPk(req.params.id);
    await record.update(_.pick(req.body, ['name']));
    res.json(record.toJSON());
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/:id', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Tag.findByPk(req.params.id);
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

export default router;
