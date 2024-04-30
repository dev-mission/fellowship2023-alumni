import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import interceptors from '../interceptors.js';

import models from '../../models/index.js';

const router = express.Router();

router.post('/', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Organization.create(_.pick(req.body, ['name', 'location', 'description', 'url']));
    res.status(StatusCodes.CREATED).json(record.toJSON());
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.delete('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Organization.findByPk(req.params.id);
    await record.destroy();
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', interceptors.requireLogin, async (req, res) => {
  const records = await models.Organization.findAll();
  const data = await Promise.all(
    records.map(async (r) => {
      const json = r.toJSON();
      json.postsCount = await r.countPosts();
      json.programsCount = await r.countPrograms();
      return json;
    }),
  );
  res.json(data);
});

router.patch('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Organization.findByPk(req.params.id);
    await record.update(_.pick(req.body, ['name', 'location', 'description', 'url']));
    res.json(record.toJSON());
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/:id', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Organization.findByPk(req.params.id);
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

export default router;
