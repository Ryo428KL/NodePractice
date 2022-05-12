require('date-utils');
require('dotenv').config();
let jsforce = require('jsforce');

/**
 * 参考
 * https://qiita.com/na0AaooQ/items/5c088a68ae43a1e74c6a
 * https://qiita.com/TaaaZyyy/items/7feb7d03cb1f5248d2e9
 * https://developer.salesforce.com/docs/atlas.ja-jp.api_rest.meta/api_rest/quickstart_prereq.htm
 */

// データ操作用オブジェクトAPI参照名 ※TODO:環境によって任意に修正すること
const sObjName = 'WorkInf__c';

// 接続情報
const org_url = process.env.SALESFORCE_ORG_URL;
const org_user_id = process.env.SALESFORCE_ORG_USER_NAME;
const org_user_pw = process.env.SALESFORCE_ORG_USER_PW;
const org_consume_key = process.env.SALESFORCE_ORG_CONSUMER_KEY;
const org_consume_secret = process.env.SALESFORCE_ORG_CONSUMER_SECRET;

// Salesforce REST APIへ接続する時の「コンシューマ鍵」(OAuthコンシューマキー等)をセットする
let conn = new jsforce.Connection({
    oauth2 : {
        loginUrl : org_url,
        clientId : org_consume_key,
        clientSecret : org_consume_secret,
    }
});

// insert用データ ※TODO:環境によって任意に修正すること
const record = {
    Name: 'REST APIによる作業情報情報登録_名称',
    DetailInf__c: 'REST APIによる作業情報情報登録_作業情報詳細',
};

// 組織に接続
conn.login(org_user_id, org_user_pw, function(err, res){
    if(err){
        return console.log(err);
    }

    // カスタムオブジェクトに登録
    conn.sobject(sObjName).create( record , function(err, res){
        if(err){
            return console.log(err);
        }
        console.log(res);
    })
});

