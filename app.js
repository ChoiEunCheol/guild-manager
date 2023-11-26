const express = require('express');
const mariadb = require('mariadb');
const path = require('path');

const app = express();
const port = 3030; // 사용할 포트 번호

// public 폴더 내의 정적 파일 (index.html)을 제공
app.use(express.static(path.join(__dirname, 'public')));

// 데이터베이스 연결 정보 설정
const pool = mariadb.createPool({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '0000',
  database: 'guild_manager',
  connectionLimit: 20
});

// /api/getMainMemberData 엔드포인트
app.get('/api/getMainMemberData', async (req, res) => {
  let conn;
  try {
    // 데이터베이스에 연결
    conn = await pool.getConnection();

    // main_member 테이블에서 데이터 쿼리
    const result = await conn.query('SELECT * FROM main_member');

    // 결과를 클라이언트에 전송
    res.json(result);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (conn) {
      // 연결 해제
      conn.release();
    }
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// 서버를 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
