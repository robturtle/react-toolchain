import { Router } from 'express';

const router = Router();

router.get('/projects/:page', (req, res) => {
  res.json([
    {
      title: 'A',
      contents: 'project a',
    },
    {
      title: 'B',
      contents: 'project ' + req.params.page,
    },
  ]);
});

export default router;