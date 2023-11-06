const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeCharacterInfo() {
  try {
    const url = 'https://maplestory.nexon.com/Common/Guild?gid=402812&wid=0';
    const response = await axios.get(url);
    const html = response.data;
    
    const $ = cheerio.load(html);
    
    // 예제: 캐릭터 이름 가져오기
    const characterName = $('div.name').text();
    
    // 예제: 레벨 가져오기
    const level = $('div.info li:contains("Level")').text();
    
    // 예제: 직업 가져오기
    const job = $('div.info li:contains("Job")').text();
    
    console.log('캐릭터 이름:', characterName);
    console.log('레벨:', level);
    console.log('직업:', job);
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

scrapeCharacterInfo();