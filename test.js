const axios = require('axios');
const cheerio = require('cheerio');

// 크롤링할 웹 페이지의 URL을 지정합니다.
for (let i = 1; i <= 10; i++) {
    url = `https://maplestory.nexon.com/Common/Guild?gid=402812&wid=0&orderby=0&page=${i}`;
    scrapeRankTable(url);
}

async function scrapeRankTable(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // class가 rank_table인 표를 식별합니다.
        const rankTable = $('table.rank_table');

        // 표에서 a 태그 안의 정보를 추출
        const tableData = [];
        rankTable.find('tr').each((rowIndex, row) => {
            const rowData = [];
            $(row).find('td a').each((colIndex, link) => {
                rowData.push($(link).text().trim());
            });
            tableData.push(rowData);
        });

        // 데이터 출력
        console.log('크롤링한 데이터:', tableData);
    } catch (error) {
        console.error('오류 발생:', error);
    }
}


