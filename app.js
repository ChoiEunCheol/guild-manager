const express = require('express');
const path = require('path');
const saveMember = require('./db');

const app = express();

const port = 3030; // 사용할 포트 번호

// public 폴더 내의 정적 파일 (index.html)을 제공
app.use(express.static(path.join(__dirname, 'public')));

// 서버를 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

//--------------------------------------------------------------------

const tesseract = require('tesseract.js');

// 이미지에서 텍스트 추출 및 데이터베이스에 저장
async function processImageAndSaveToDB(imagePath) {
    try {
        // Tesseract를 사용하여 이미지에서 텍스트 추출
        const { data: { text } } = await tesseract.recognize(
            imagePath,
            'eng', // 언어 설정 (영어)
            { logger: info => console.log(info) } // 로그 출력 설정
        );

        // 추출된 텍스트를 데이터베이스에 저장
        if (text) {
            const characterNames = text.split('\n').filter(name => name.trim() !== '');
            await saveMember(characterNames);
        } else {
            console.log('이미지에서 텍스트를 추출할 수 없습니다.');
        }
    } catch (err) {
        console.error('이미지 처리 및 데이터베이스 저장 에러', err);
    }
}

const multer = require('multer');

// Multer 설정
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 이미지 업로드를 처리하고 데이터베이스에 저장
app.post('/uploadImage', upload.single('image'), (req, res) => {
    // 이미지가 업로드되면 임시 파일 경로를 가져와서 처리
    const imagePath = req.file.buffer;

    processImageAndSaveToDB(imagePath);

    res.send('이미지가 성공적으로 처리되었습니다.');
});