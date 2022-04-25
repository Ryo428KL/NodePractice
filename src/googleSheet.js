'use strict';
// https://www.twilio.com/blog/load-data-from-google-spreadsheet-jp
require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.loadGoogleSpreadSheet = async function loadGoogleSpreadSheet(){
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    const credentials = require('../credentials.json');
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const shiftSheet = await doc.sheetsById[process.env.WORKSHEET_ID];
    const shiftRows = await shiftSheet.getRows();

    let output = '';
    for(let step = 0; step < shiftRows.length; step++){
        for(let index = 0; index < shiftRows[step]._rawData.length; index++){
            console.log(shiftRows[step]._rawData);
            output += shiftRows[step]._rawData[index];
        }
    }
    console.log(output);
}

exports.getSchedule = async function getSchedule(){
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID); // スプレッドシートにアクセス
    const credentials = require('../credentials.json'); // 認証情報
    await doc.useServiceAccountAuth(credentials); // 認証情報を指定
    await doc.loadInfo(); // 指定した認証情報でスプレッドシートの中身をロードする

    const scheduleSheet = await doc.sheetsById[process.env.WORKSHEET_ID]; // スプレッドシートのどのシートにアクセスするか指定
    const shiftRows = await scheduleSheet.getRows(); // 行情報取得したら後はご自由に
    let output = '';
    let num;
    for(let step = 0; step < shiftRows.length; step++){
        for(let index = 0; index < shiftRows[step]._rawData.length; index++){
            output += shiftRows[step]._rawData[index];
            if(shiftRows[step]._rawData[index] !== ''){
                output = shiftRows[step]._rawData[index];
                num = index;
                break;
            }
        }
    }
    return scheduleSheet.headerValues[num]+'の'+output+'やぞ';
}
exports.getScheduleWeekly = async function getScheduleWeekly(){
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    const credentials = require('../credentials.json');
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();

    const scheduleSheet = await doc.sheetsById[process.env.WORKSHEET_ID];
    const scheduleRows = await scheduleSheet.getRows();
    let output=[];
    for(let step = 0; step < scheduleRows.length; step++){
        for(let index = 0; index < scheduleRows[step]._rawData.length; index++){
            if(scheduleRows[step]._rawData[index] !== ''){
                output.push(scheduleSheet.headerValues[index]+':'+scheduleRows[step]._rawData[index]);
            }
        }
    }
    return output;
}


