const Tesseract = require('tesseract.js');

// 이미지 파일 경로
const imagePath = './TestImage.png';

// Tesseract.js로 텍스트 추출
Tesseract.recognize(
  imagePath, // 이미지 파일 경로
  'kor+eng', // 언어 코드 (영어인 경우 'eng')
  {
    logger: info => console.log(info), // 로그 출력
  }
).then(({ data: { text } }) => {
  // 추출된 텍스트를 줄 단위로 나누기
  const lines = text.split('\n');

  // 각 줄을 토큰으로 나누어 2차원 배열로 만들기
  const tableData = lines.map(line => line.split(/\s+/));

  // 표 형식으로 출력
  console.log('추출된 데이터:');
  tableData.forEach(row => {
    console.log(row.join('\t')); // 탭으로 구분된 형식으로 출력
  });
}).catch(error => {
  console.error('에러 발생:', error);
});