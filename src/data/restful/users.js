import { User } from '../models';
import { Router } from 'express';
import { findUser } from '../utils';
import {
  ParameterError,
  extractUser,
  extractSnippet,
  makeData,
} from './utils';

const router = new Router();

// User list
router.get('/', async (req, res) => {
  const conditions = {}
  if (req.body.filterUnconfirmed) {
    conditions.emailConfirmed = true;
  }
  const users = await User.findAll({ where: conditions });
  const data = users.map(extractUser);
  res.json(makeData(data));
});

// One user
router.all('/:username*', async (req, res, next) => {
  try {
    if (req.method === 'POST') {
      if (!req.body.email) {
        const err = new ParameterError(
            'email is required to create a new User');
        return next(err);
      }
        await Promise.all([
          findUser({ name: req.params.username }, false),
          findUser({ email: req.body.email }, false),
        ]);
    } else {
      req.user = await findUser({ name: req.params.username });
    }
  } catch (err) {
    return next(err);
  }
  return next();
});

router.get('/:username', (req, res) => {
  res.json(makeData(extractUser(req.user)));
});

router.post('/:username', async (req, res) => {
  const user = await User.create({
    name: req.params.username,
    ...req.body,
  });
  res.json(makeData(extractUser(user)));
});

router.put('/:username', async (req, res) => {
  const user = await req.user.update({ ...req.body });
  res.json(makeData(extractUser(user)));
});

router.delete('/:username', async (req, res) => {
  await req.user.destroy();
  res.json(makeData(null));
});

router.get('/:username/snippets', async (req, res) => {
  try {
    const snippets = await req.user.getSnippets();
    const data = snippets.map(extractSnippet);
    res.json(makeData(data));
  } catch (e) {
    res.json(makeData(e.message))
  }
});

export default router;
