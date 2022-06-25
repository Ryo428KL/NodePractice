/**
 * Puppeteerを利用してプログラム上からwebページのキャプチャを取得してくるサンプル
 * 参考
 * https://pptr.dev/
 * https://qiita.com/hisashi_matsui/items/6452770eb2528f38ca80
 */

const puppeteer = require('puppeteer');

(async () => {
    //ヘッドレスブラウザの起動
    const browser = await puppeteer.launch();
    //タブを開く
    const page = await browser.newPage();
    //指定したURLに遷移
    await page.goto('https://www.google.com/?hl=ja');
    //スクショを撮り、ファイル名example.pngにする。
    await page.screenshot({ path: './img/Puppeteer/example.png' });
    //終了
    await browser.close();
})();
