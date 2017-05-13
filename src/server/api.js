import { Router } from "express";
import { query } from './db';

const router = Router();

router.get("/projects", async (req, res) => {
  let projects = {
    rowCount: 0,
    rows: []
  };
  try {
    projects = await query(
      `SELECT pid, title, description, owner, city, due, fund, maxFund
       FROM crowd_funding.project_overview`
    );
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
  console.log(projects.rows[0])
  res.json({
    total: projects.rowCount,
    data: projects.rows,
  });
});

router.get("/likes", async (req, res) => {
  // get uname from session
  let likes = [];
  try {
    likes = await query(
      `SELECT pid FROM crowd_funding.like_proj WHERE uname=$1`,
      ['yangliu']
    );
    likes = likes.rows.map(r => r.pid);
  } catch (err) {
    console.log(`ERROR: ${err}`)
  }
  res.json(likes);
});

router.post('*', (req, res, next) => {
  console.log('received post ' + JSON.stringify(req.body, null, 2));
  next();
});

router.post('/like', (req, res) => {
  const { pid, liked } = req.body.data;
  res.json({ pid, liked: !liked });
});

router.get('*', (req, res) => {
  res.json({err: "not implemented!"})
});

export default router;