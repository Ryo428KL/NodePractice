const utils = require('./getTrailblazerInfUtils.js');

// コマンドラインから取得モードを決定
const modeInf = utils.getMode();
console.log(JSON.stringify(modeInf, null, '\t'));
switch (modeInf?.mode){
    case 'user':
        // 1ユーザ
        if(modeInf?.id){
            utils.getTrailblazerScoreUnit(modeInf.id);
        }
        break;
    case 'list':
        // csvに記載された複数ユーザ
        utils.importUserData(modeInf.path).then(data => {
            console.log(data);
            utils.getTrailblazerScoreList(data, modeInf.orgSave);
        });
        break;
    default : return;
}


