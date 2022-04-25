// 抽選漏れ考察
let lotteryList = [];
// 抽選参加者X人とする
const lotteryNum = 5
for(let step = 0; step < lotteryNum; step ++){
    lotteryList.push('参加者番号'+step+'番');
}

// 抽選用のリストを作成
let winningList = [];
for(let step = 0; step < lotteryNum ;step ++){
    let e = true
    while(e){
        const s = randNum(lotteryNum);
        if(winningList[s] === undefined){ // 抽選配列が空の場合そこに設定、もういる場合、入らないので再抽選
            winningList[s] = lotteryList[step];
            e = false;
        }
    }
}
// 中身はどうなってるのか
// console.log(JSON.stringify(winningList, null, '\t'));

if(winningList[1]){
    console.log('当選したのは'+winningList[1]+'さんです！');
}else{
    console.log('当選者は・・・・いませんでした！');
}

function randNum(Num){
    // 0-Numまでのランダムの整数を作成して返却
    return Math.floor(Math.random() * (Num + 1));
}