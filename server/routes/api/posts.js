import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import interceptors from '../interceptors.js';

import models from '../../models/index.js';

const router = express.Router();

router.post('/', interceptors.requireAdmin, async (req, res) => {
  try {
    const data = _.pick(req.body, [
      'postedOn',
      'expiresOn',
      'title',
      'description',
      'applicationUrl',
      'isPaidOpportunity',
      'entryCost',
      'referredBy',
      'isRecurring',
      'isArchived',
      'workLocation',
      'OrganizationId',
      'ProgramId',
    ]);
    data.UserId = req.user.id;
    const record = await models.Post.create(data);
    const tagIds = _.pick(req.body, ['tagIds']).tagIds;
    if (tagIds) {
      await record.setTags(tagIds);
    }
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
    const record = await models.Post.findByPk(req.params.id);
    await record.setTags([]);
    await record.destroy();
    res.status(StatusCodes.OK).end();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

router.get('/', interceptors.requireLogin, async (req, res) => {
  const records = await models.Post.findAll({ include: [models.Organization, models.Tag] });
  const data = await Promise.all(
    records.map(async (r) => {
      const json = r.toJSON();
      json.bookmarksCount = await r.countBookmarks();
      return json;
    }),
  );
  // console.log(data);
  res.json(data);
});

router.patch('/:id', interceptors.requireAdmin, async (req, res) => {
  try {
    const record = await models.Post.findByPk(req.params.id);
    await record.update(
      _.pick(req.body, [
        'postedOn',
        'expiresOn',
        'title',
        'description',
        'applicationUrl',
        'isPaidOpportunity',
        'entryCost',
        'referredBy',
        'isRecurring',
        'isArchived',
        'workLocation',
        // 'UserId',
        'OrganizationId',
        'ProgramId',
      ]),
    );
    const tagIds = _.pick(req.body, ['tagIds']).tagIds;
    if (tagIds) {
      await record.setTags(tagIds);
    }
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

router.get('/:id', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Post.findByPk(req.params.id, { include: [models.Organization, models.Tag] });
    res.json(record.toJSON());
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  }
});

export default router;
