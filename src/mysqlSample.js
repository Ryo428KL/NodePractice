/**
 * mysql接続ソースサンプル
 * https://qiita.com/PianoScoreJP/items/7ed172cd0e7846641e13
 * npmパッケージのmysqlでは認証が通らないためmysql2で実施
 * https://ameblo.jp/sijukara-tama/entry-12687333413.html
 * https://moewe-net.com/nodejs/mysql2
 * https://www.npmjs.com/package/mysql2
 */
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host:'localhost',
    user:process.env.MYSQL_USERID,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
});

// シンプルなSQL接続
async function sipleQuery(){
    connection.query('select * from preuser;',function(err, results){
        if(err){
            console.log(err);
            return;
        }
        console.log(JSON.stringify(results, null, '\t'));
        connection.end();
    });
}
sipleQuery();



