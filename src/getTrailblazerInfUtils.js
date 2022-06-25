const yargs = require('yargs').argv;
require('dotenv').config();
const Tesseract = require('tesseract.js');
const Puppeteer = require('puppeteer');

// file system モジュールを読み込む
const fs = require('fs');
// csv モジュールの内，必要な機能を読み込む
const parse = require('csv-parse/lib/sync');
const jsforce = require('jsforce');

// SF接続情報
const sObjName = 'TrailblazerScore__c';
const org_url = process.env.SALESFORCE_ORG_URL;
const org_user_id = process.env.SALESFORCE_ORG_USER_NAME;
const org_user_pw = process.env.SALESFORCE_ORG_USER_PW;
const org_consume_key = process.env.SALESFORCE_ORG_CONSUMER_KEY;
const org_consume_secret = process.env.SALESFORCE_ORG_CONSUMER_SECRET;

/**
 * コマンドラインを確認してモードを返却
 * @return mode 実行モード
 */
exports.getMode = function (){
    console.log('getMod is started');
    const mode = yargs.mode;
    const id = yargs.id;
    const path = yargs.path;
    const isSave = yargs.orgsave;
    if(mode !== 'user' && mode !== 'list'){
        console.log('--modeでパラメータを指定してください');
        console.log('--mode=user --id=UserId >>>>>UserIdのtrailblazer情報を取得');
        console.log('--mode=list --path=list.csv >>>>>list.csvに記載されたユーザのtrailblazer情報を取得');
        console.log('--mode=list --path=list.csv --orgsave >>>>>list.csvに記載されたユーザのtrailblazer情報を取得後、salesforce組織へ保存');
    }
    return {
        mode:mode,
        id:id,
        path:path,
        orgSave: isSave,
    };
}

/**
 * 指定されたユーザIDをもとにTrailblazerスコアを取得
 * @param userId 対象ユーザId
 * @return result 取得結果
 */
exports.getTrailblazerScoreUnit = function(userId){
    const baseUrl = process.env.TRAILBLAZER_URL;
    console.log('access url is ', baseUrl+userId);
    const callback = function(fileName){
        console.log('callback: fileName is ', fileName);
        // 画像読み込み処理
        Tesseract.recognize(fileName,'eng',{ logger: m => {} }).then(({ data: { text } })=>{
            let score = {
                userId:userId,
            };
            const matchResult = text.replaceAll(',','').replaceAll('.','').match(/\d+\s\d+\s\d+/);
            if(matchResult?.[0]){
                const scoreAry = matchResult[0].split(' ');
                for(let step = 0; step<scoreAry.length; step++){
                    score.Badges = scoreAry[0];
                    score.Points = scoreAry[1];
                    score.Trails = scoreAry[2];
                    score.result = 'success';
                }
            }else{
                score.result = 'failure';
            }
            console.log(JSON.stringify(score, null, '\t'));
        });
    }
    getCapture(baseUrl, userId, './img/Puppeteer/example.png', callback);
}

/**
 * csvからユーザ情報を取得
 * @param csvPath csvファイルパス
 * @return result ユーザ情報
 */
exports.importUserData = async function(path){
    const inputData = fs.readFileSync(path, { encoding : 'utf8' });
    const parsedData = parse(inputData, { columns : true });
    return parsedData;
}

/**
 * csvから取得したユーザ情報をもとにTrailblazerスコアを取得
 * @param userInfs ユーザ情報
 * @return result Trailblazerスコア情報
 */
exports.getTrailblazerScoreList = async function(userInfs, isSave){
    if(!userInfs){
        return;
    }
    const urlBase = process.env.TRAILBLAZER_URL;
    const callback = (fileName, userId) => {
        console.log('callback: fileName is ', fileName);
        const callback2 = function(score){
            saveSFOrg(score);
        }
        getScoreInf(fileName, userId, callback2);
    }
    userInfs.forEach(data=>{
        console.log('data:',data);
        getCapture(urlBase, data.id, './img/Puppeteer/' + data.name +'.png', callback);
    });
}

/**
 * Puppeteerによる画像取得処理
 * @param url 取得先URL
 * @param fileName 保存先ファイルパス
 * @param callback コールバック関数
 */
async function getCapture(baseUrl, userId, fileName, callback){
    const url = baseUrl + '' + userId;
    (async () => {
        //ヘッドレスブラウザの起動
        const browser = await Puppeteer.launch();
        //タブを開く
        const page = await browser.newPage();
        //指定したURLに遷移
        await page.goto(url);
        setTimeout(()=>{        
            page.screenshot({ path: fileName });
            setTimeout(()=>{
                browser.close();
                callback(fileName, userId);
            }, 1000);
        }, 1500);
    })();
}

/**
 * 取得した画像データを削除する
 * @param path ディレクトリパス
 */
function deleteGetImg(path){

}

/**
 * 画像からスコア情報を取得して返却
 * @param fileName
 * @param userId
 * @return score
 */
function getScoreInf(fileName, userId, callback){
    // 画像読み込み処理
    Tesseract.recognize(fileName,'eng',{ logger: m => {} }).then(({ data: { text } })=>{
        let score = {
            userId:userId,
        };
        const matchResult = text.replaceAll(',','').replaceAll('.','').match(/\d+\s+\d+\s+\d+/);
        if(matchResult?.[0]){
            const scoreAry = matchResult[0].split(/\s+/);
            for(let step = 0; step<scoreAry.length; step++){
                score.Badges = scoreAry[0];
                score.Points = scoreAry[1];
                score.Trails = scoreAry[2];
                score.result = 'success';
            }
        }else{
            score.result = 'failure';
        }
        // salesforce組織に保存
        console.log(JSON.stringify(score, null, '\t'));
        callback(score);
    });
}

/**
 * salesforce組織へ保存する
 * @param scoreData スコア情報
 */
function saveSFOrg(scoreData){
    if(scoreData.result === 'failure'){
        console.log('scoreData is none return');
        return;
    }
    let conn = new jsforce.Connection({
        oauth2 : {
            loginUrl : org_url,
            clientId : org_consume_key,
            clientSecret : org_consume_secret,
        }
    });
    const record = {
        Name: 'UserName:'+scoreData.userId,
        TrailUserId__c: scoreData.userId,
        Badges__c: scoreData.Badges,
        Points__c: scoreData.Points,
        Trails__c: scoreData.Trails,
    };
    conn.login(org_user_id, org_user_pw, (err, res) => {
        if(err){
            return console.log(err);
        }

        // カスタムオブジェクトに登録
        conn.sobject(sObjName).create( record , (err, res) => {
            if(err){
                return console.log(err);
            }
            console.log(res);
        })
    });
}
