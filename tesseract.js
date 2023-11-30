const Tesseract = require('tesseract.js');

// 이미지 파일 경로
const imagePath = "D:\Choieuncheol\TestImage.png";

// Tesseract.js로 텍스트 추출
Tesseract.recognize(
  imagePath, // 이미지 파일 경로
  'eng', // 언어 코드 (영어인 경우 'eng')
  {
    logger: info => console.log(info), // 로그 출력
  }
).then(({ data: { text } }) => {
  console.log('추출된 텍스트:', text);
}).catch(error => {
  console.error('에러 발생:', error);
});