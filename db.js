const mariadb = require('mariadb');

// MariaDB 연결 정보
const pool = mariadb.createPool({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '0000',
    database: 'guild_manager',
    connectionLimit: 10, // 동시에 유지될 연결 수
});

// 배열의 각 요소를 데이터베이스에 저장
async function saveMember(characterNames) {
    let conn;

    try {
        conn = await pool.getConnection();

        for (const name of characterNames) {
            await conn.query('INSERT INTO main_member (name) VALUES (?) ', [name]);
        }

        console.log('별빛 길드원 저장 성공');
    } catch (err) {
        console.error('데이터 저장 에러', err);
    } finally {
        if (conn) {
            conn.release(); // 연결 반환!
        }
    }
}

module.exports = saveMember;

// MariaDB 연결 풀에서 연결
pool.getConnection()
    .then((conn) => {
        console.log('MariaDB에 연결됨');

        // 쿼리 실행 또는 다른 작업 수행
        conn.query('SELECT * FROM main_member')
            .then((rows) => {
                console.log(rows);  // 쿼리 결과 출력
            })
            .catch((err) => {
                console.error('쿼리 에러', err);
            })
            .finally(() => {
                // 연결 반환
                conn.release();
                console.log('연결 반환');
            });
    })
    .catch((err) => {
        console.error('DB 연결 에러', err);
    });

// --------------------------------------------------
// 데이터베이스 쿼리 수행 함수
async function queryDatabase() {
  let conn;
  try {
    // 데이터베이스에 연결
    conn = await pool.getConnection();

    // main_member 테이블에서 데이터 쿼리
    const result = await conn.query('SELECT * FROM main_member');

    // 결과를 브라우저에 출력
    result.forEach(row => {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          console.log(`${key}: ${row[key]}`);
        }
      }
    });
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      // 연결 해제
      conn.release();
    }
  }
}

// 데이터베이스 쿼리 실행
queryDatabase();