const express = require('express');
const restrictionModel = require('../models/restriction');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const inputhtml = fs.readFileSync(path.join(__dirname, 'input.html'), 'utf8');

  res.send(inputhtml);
});

router.post('/addMembers', async (req, res) => {
  const { names } = req.body;

  if (!names || names.length === 0) {
    return res.status(400).json({ error: '이름은 필수입니다.' });
  }

  try {
    const namesArray = JSON.parse(names);

    for (const name of namesArray) {
      await restrictionModel.create({ name: name.trim() });
    }

    res.status(200).json({ message: '멤버가 성공적으로 추가되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

module.exports = router;