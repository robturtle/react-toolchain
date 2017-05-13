import { Router } from "express";

const router = Router();

router.get("/projects", (req, res) => {
  res.json({
    total: 200,
    data: [
      {
        pid: '1',
        title: 'Project A',
        description: 'A great project',
        liked: false,
        city: 'NYC',
        username: 'Alice',
        due: '2017-05-12',
        fund: '32000',
        maxFund: '65000',
      },
      {
        pid: '2',
        title: 'Project B',
        description: 'B great project',
        liked: true,
        city: 'CA',
        username: 'Bob',
        due: '2017-05-14',
        fund: '180000',
        maxFund: '3600000',
      },
    ],
  });
});

router.post('/like', (req, res) => {
  console.log(`received liked: ${req.body.body}`);
  const { pid, liked } = req.body.data;
  res.json({ pid, liked: !liked });
});

router.post('*', (req, res) => {
  console.log('received post ' + JSON.stringify(req.body, null, 2));
  res.json({ data: req.body })
});

router.get('*', (req, res) => {
  res.json({err: "not implemented!"})
});

export default router;