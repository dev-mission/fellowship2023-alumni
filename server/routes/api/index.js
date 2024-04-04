import express from 'express';
import assetsRoutes from './assets.js';
import authRoutes from './auth.js';
import invitesRoutes from './invites.js';
import passwordsRoutes from './passwords.js';
import usersRoutes from './users.js';

import cohortsRoutes from './cohorts.js';
import tagsRoutes from './tags.js';
import organizationsRoutes from './organizations.js';
import programsRoutes from './programs.js';
import postsRoutes from './posts.js';
import bookmarksRoutes from './bookmarks.js';
import postTagsRoutes from './posttags.js';

const router = express.Router();

router.use('/assets', assetsRoutes);
router.use('/auth', authRoutes);
router.use('/invites', invitesRoutes);
router.use('/passwords', passwordsRoutes);
router.use('/users', usersRoutes);

router.use('/cohorts', cohortsRoutes);
router.use('/tags', tagsRoutes);
router.use('/organizations', organizationsRoutes);
router.use('/programs', programsRoutes);
router.use('/posts', postsRoutes);
router.use('/bookmarks', bookmarksRoutes);
router.use('/posttags', postTagsRoutes);

export default router;
