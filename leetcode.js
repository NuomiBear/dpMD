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
var punishmentNumber = function(n) {
    // s=> n^2
    // s.length 字符串长度
    // target == i
    const dfs = (s, pos, tot, target) => {
        if (pos == s.length) {
            return tot == target;
        }
        let sum = 0;
        for (let i = pos; i < s.length; i++) {
            sum = sum * 10 + parseInt(s[i]);
            if (tot + sum > target) {
                break;
            }
            if (dfs(s, i + 1, tot + sum, target)) {
                return true;
            }
        }
        return false;
    }
    let res = 0;
    for (let i = 1; i <= n; i++) {
        let s = (i * i).toString();
        if (dfs(s, 0, 0, i)) {
            res += i * i;
        }
    }
    return res;
};


// 2520. 统计能整除数字的位数

/**
 * @param {number} num
 * @return {number}
 */
var countDigits = function (num) {
    let t = num
    let res = 0
    while (t) {
        if (num % (t % 10) == 0) {
            res += 1
        }
        t = Math.floor(t / 10)
    }
    return res
};


// 1465. 切割后面积最大的蛋糕

/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
var maxArea = function(h, w, horizontalCuts, verticalCuts) {

};