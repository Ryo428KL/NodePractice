// https://qiita.com/ledsun/items/0965a60f9bdff04f2fa0#jsdom
const request = require('request')
const {
  JSDOM
} = require('jsdom')

request('http://www.uec.ac.jp/', (e, response, body) => {
  if (e) {
    console.error(e)
  }

  try {
    const dom = new JSDOM(body);
    console.log(dom.window.document.querySelector('.newsList')); // これでHTMLDListElementが取れる？
    const latestDate = dom.window.document.querySelector('.newsList')
      .children[0].firstChild.textContent.trim();
    console.log(`最新の新着情報の日付は${latestDate}です。`)
  } catch (e) {
    console.error(e)
  }
})