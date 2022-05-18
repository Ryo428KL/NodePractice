/* 平均値 */
const average = function(nums) {
	if (typeof nums !== 'object' || nums.length === 0) return false;

	var totalNumber = 0;
	for (var key in nums) totalNumber = totalNumber + Number(nums[key]);

	return totalNumber / nums.length;
};

/* 最大値 */
const max = function(nums){
    return Math.max(...nums);
}

/* 最小値 */
const min = function(nums){
    return Math.min(...nums);
}

/**
 * 与えられた数値群と数式で計算処理を行う
 * @param Nums Number型のみで構成される数値の配列
 * @param Formula String型の数式 Ave/AVE Max/MAX Min/MIN () + - * / を使用可能とする
 * @return res 計算結果
 */
exports.anyCalc = function(Nums, Formula){
    // 置換用各数値準備
    const maxNum = max(Nums);
    const minNum = min(Nums);
    const aveNum = average(Nums);
    // 数式を各値に置換する
    const aveInsrtedFomula = Formula.replaceAll(/(Ave|AVE)/g,aveNum); // 平均値
    const maxInsertedFomula = aveInsrtedFomula.replaceAll(/(Max|MAX)/g,maxNum); // 最大値
    const minInsertedFomula = maxInsertedFomula.replaceAll(/(Min|MIN)/g,minNum); // 最小値
    try{
        return Function('return (' + minInsertedFomula + ');')();
    }catch(error){
        console.log(error);
        return 0;
    }
}
