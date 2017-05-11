import { Router } from 'express';

const router = Router();

router.get('/projects/:page', (req, res) => {
  res.json({
    current: parseInt(req.params.page),
    pageSize: 30,
    total: 50,
    data: req.params.page == 2 ? [{title: '2'}] : [
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
      {
        title: 'A',
        contents: 'project a',
      },
      {
        title: 'B',
        contents: 'project ' + req.params.page,
      },
    ]
  });
});

export default router;