/* 与えられた数値群と数式で計算処理を行う_サンプル実行処理 */
const calc = require('./anyCalculation.js');
const Nums1 = [1, 2, 0, 0.5, 6];
const Nums2 = [1, 0, 0, 0.0001, 100];
const Nums3 = [0.0001, 0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000, 100000];
const Fomula1 = '(Max+MIN)/2';
const Fomula2 = 'AVE/Max * 100';
const Fomula3 = 'AVE/Min * 100';
const Fomula4 = '(AVE/Min - AVE/Max) * 100'
const FomulaErr1 = 'aaa/Min * 100'
const FomulaErr2 = 'ABE/Min * 100'
const FomulaErr3 = 'AVE/Minn * 100'

// 実行
const res1_1 = calc.anyCalc(Nums1, Fomula1);
const res1_2 = calc.anyCalc(Nums1, Fomula2);
const res1_3 = calc.anyCalc(Nums1, Fomula3);
const res1_4 = calc.anyCalc(Nums1, Fomula4);
const res2_1 = calc.anyCalc(Nums2, Fomula1);
const res2_2 = calc.anyCalc(Nums2, Fomula2);
const res2_3 = calc.anyCalc(Nums2, Fomula3);
const res2_4 = calc.anyCalc(Nums2, Fomula4);
const res3_1 = calc.anyCalc(Nums3, Fomula1);
const res3_2 = calc.anyCalc(Nums3, Fomula2);
const res3_3 = calc.anyCalc(Nums3, Fomula3);
const res3_4 = calc.anyCalc(Nums3, Fomula4);

const res3_er1 = calc.anyCalc(Nums3, FomulaErr1);
const res3_er2 = calc.anyCalc(Nums3, FomulaErr2);
const res3_er3 = calc.anyCalc(Nums3, FomulaErr3);

console.log('res1_1:',res1_1,' res1_2:',res1_2,' res1_3:',res1_3,' res1_4:',res1_4);
console.log('res2_1:',res2_1,' res2_2:',res2_2,' res2_3:',res2_3,' res2_4:',res2_4);
console.log('res3_1:',res3_1,' res3_2:',res3_2,' res3_3:',res3_3,' res3_4:',res3_4);
console.log('res3_er1:', res3_er1, ' res3_er2:', res3_er2, ' res3_er3:', res3_er3);


