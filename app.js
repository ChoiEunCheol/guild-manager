const express = require('express');
const path = require('path');
const mariadb = require('mariadb');

const app = express();
const port = 3030; // 사용할 포트 번호
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'guild_manager',
  connectionLimit: 1000,
});

// public 폴더 내의 정적 파일 (index.html)을 제공
app.use(express.static(path.join(__dirname, 'public')));

app.get('/members', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM main_member');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) {
      try {
        conn.release(); // 연결을 풀에 반환
      } catch (e) {
        console.error('Error releasing connection:', e);
      }
    }
  }
});

// 서버를 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
