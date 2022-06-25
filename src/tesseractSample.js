/**
 * tesseract.jsを用いた画像の文字読み込みサンプル
 * 参考
 * https://qiita.com/yamayamasan/items/1dd911b817c8bb51fc43
 * https://www.npmjs.com/package/tesseract.js/v/2.1.1
 */

const Tesseract = require('tesseract.js');

const targetImg = './img/sample001.png';

Tesseract.recognize(targetImg,'jpn',{ logger: m => console.log(m) }).then(({ data: { text } })=>{
    console.log(text);
});
