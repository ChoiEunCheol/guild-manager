const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3030;

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'guild_manager'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/saveData', async (req, res) => {
  const { data } = req.body;

  try {
    const conn = await pool.getConnection();
    const query = 'INSERT INTO input_test (NAME) VALUES (?)';
    await conn.query(query, [data]);
    conn.release();
    res.send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error); // 오류를 콘솔에 기록
    res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});