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
    const mod = 1e9 + 7;
    f = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0));
    f[0][0] = 1;
    console.log(f)
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= target; j++) {
            for (let x = 1; x <= k; x++) {
                if (j - x >= 0) {
                    console.log(f[i - 1][j - x])
                    f[i][j] = (f[i][j] + f[i - 1][j - x]) % mod;
                }
            }
        }
    }
    return f[n][target];
};


// 2698. 求一个整数的惩罚数

/**
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function (n) {
    var result = 0
    for (i = 1; i <= n; i++) {
        result = i * i
    }

};