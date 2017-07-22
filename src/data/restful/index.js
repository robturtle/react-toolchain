import { Router } from 'express';
import {
  NotFoundError,
  AlreadyExistsError
} from '../utils';
import { makeError } from './utils';
import users from './users';

const router = new Router();

router.use('/users', users);
// TODO: please implement all other APIs

router.get('/fuckme', (req, res) => { // eslint-disable-line
  throw new NotFoundError('fuck me!');
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json(makeError(err));
  } else if (err instanceof AlreadyExistsError) {
    // https://goo.gl/5dch1x StackOverflow best status for 'already exists'
    return res.status(409).json(makeError(err));
  }
  // https://goo.gl/JqyuXR StackOverflow best status for 'bad request'
  return res.status(400).json(makeError(err));
});

export default router;
