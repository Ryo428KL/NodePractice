# NodePractice
Nodejs練習用  
`npm install`を行ってから`node <ファイル名>`で色々やってみてね  
<br>
# 設定ファイルについて
.envファイル及びcredentials.jsonは別途用意が必要
```.env:.env
SPREADSHEET_ID=<googleスプレッドシートのファイルId>
WORKSHEET_ID=<googleスプレッドシートのシートId>
DISCORD_TOKEN=<discordのトークン情報>
```

```credentials.json:credentials.json
{
    "comment":"https://www.twilio.com/blog/load-data-from-google-spreadsheet-jp を参考に作成すること"
}
```
上記2ファイルをREADME.mdと同ディレクトリに配置してね
```txt:ディレクトリ構造
NodePractice
┗fonts
┗src
┗.gitignore
┗README.md
┗package.json
┗.env ←追加
┗credentials.json  ←追加
```
#ディスコードに接続するコマンド
```
npm run discord
```