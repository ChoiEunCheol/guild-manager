const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeRankTable(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // class가 rank_table인 표를 식별합니다.
    const rankTable = $('table.rank_table');

    // 표에서 데이터 추출
    const tableData = [];
    rankTable.find('tr').each((rowIndex, row) => {
      const rowData = [];
      $(row).find('td').each((colIndex, cell) => {
        rowData.push($(cell).text().trim()); // .trim()은 공백을 제거합니다.
      });
      tableData.push(rowData);
    });

    // 데이터 출력
    console.log('크롤링한 데이터:', tableData);
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

// 크롤링할 웹 페이지의 URL을 지정합니다.
const url = 'https://maplestory.nexon.com/Common/Guild?gid=402812&wid=0';
scrapeRankTable(url);