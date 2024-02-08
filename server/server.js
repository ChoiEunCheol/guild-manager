const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./db.js');
require('./models/modelAssociations.js');
const jwt = require('jsonwebtoken');
const { Guild } = require('./models/Guild.js');

const recordRoutes = require('./routes/recordRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 등록
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// DB 연결 확인
sequelize.authenticate()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error('데이터베이스 연결 실패:', err.message);
  });

// 테이블 생성
// sequelize.sync()
// .then(() => {
//   console.log('테이블이 성공적으로 생성되었습니다.');
// })
// .catch((err) => {
//   console.error('테이블 생성 실패:', err.message);
// });

// API 라우터 등록
app.use(recordRoutes);
app.use(authRoutes);

app.get('/test', (req, res) => {
  // 클라이언트로부터 전달받은 토큰을 req.headers.authorization에서 추출합니다.
  const token = req.headers.authorization.split(' ')[1];
  // 토큰을 해독하여 사용자 정보를 추출합니다.
  const decodedToken = jwt.verify(token, 'WE_MUST_HIDE_THIS_KEY');
  // 추출한 사용자 정보를 이용하여 DB를 조회합니다.
  const guildWorldId = decodedToken.guild_world_id;
  const guildName = decodedToken.guild_name;
  // 여기서는 예시로 단순히 guildWorldId와 guildName을 응답합니다.
  res.json({ guildWorldId, guildName });
});

// ! 이 코드는 다른 라우터들보다 아래에 위치하여야 합니다.
// 클라이언트 리액트 앱 라우팅 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// ! 조심해주세요!

// 서버 시작
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});