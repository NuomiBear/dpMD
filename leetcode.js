// 2678.老人的数目

/**
 * @param {string[]} details
 * @return {number}
 */

var countSeniors = function (details) {
    let count = 0
    details.forEach((item, index) => {
        Number(item.slice(11, 13)) > 60 ? count++ : null
    })
    return count
};


// 1155.掷骰子等于目标和的方法数

/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */

var numRollsToTarget = function (n, k, target) {
    //n个骰子，每个骰子k个面，和为target
    const mod = 1e9 + 7;
    //此处f 结果为数组 内部为 n+1个 数组  每个数组为 target+1 个 0
    //如 [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]
    f = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0));
    //结果如 [[1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]
    f[0][0] = 1;
    for (let i = 1; i <= n; i++) {
        //第i个骰子
        for (let j = 0; j <= target; j++) {
            //第i个骰子：和为j
            for (let x = 1; x <= k; x++) {
                //第i个骰子：和为j：第x面
                if (j - x >= 0) {
                    f[i][j] = (f[i][j] + f[i - 1][j - x]) % mod;
                    console.log(i, j, x, f[i][j])
                }
            }
        }
    }
    console.log(f)
    console.log(f[n][target])
    return f[n][target];
};

console.log(numRollsToTarget(3, 7, 7))