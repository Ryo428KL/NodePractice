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
SALESFORCE_ORG_URL=<salesforce接続用ログインURL>
SALESFORCE_ORG_USER_NAME=<salesforce接続用ユーザ名>
SALESFORCE_ORG_USER_PW=<salesforce接続用ユーザPW>
SALESFORCE_ORG_CONSUMER_KEY=<salesforce接続用アプリケーションコンシューマ鍵>
SALESFORCE_ORG_CONSUMER_SECRET=<salesforce接続用アプリケーションコンシューマ秘密>
```

```credentials.json:credentials.json
{
    "comment":"https://www.twilio.com/blog/load-data-from-google-spreadsheet-jp を参考に作成すること"
}
```
上記2ファイルをREADME.mdと同ディレクトリに配置してね
```txt:ディレクトリ構造
NodePractice
├fonts/
├src/
├.gitignore
├README.md
├package.json
├.env ←追加
└credentials.json  ←追加
```
# ディスコードに接続するコマンド
```
npm run discord
```
# trailblazerからバッジ、ポイント、トレイル情報を取得
1. .envファイルに下記を追加すること
```
TRAILBLAZER_URL=https://trailblazer.me/id/
```
2. csvファイル内容はdata/csv/sample.csvを参考にすること

3. 下記コマンドで実行すること ※--mode=listで実行するとSF組織へ保存する
```
node src/getTrailblazerInf.js  --mode=user --id=<user id>
node src/getTrailblazerInf.js  --mode=list --path=<path to csv>
```