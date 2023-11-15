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

const dfs = (s, pos, tot, target) => {
    if (pos == s.length) {
        return tot == target;
    }
    let sum = 0;
    for (let i = pos; i < s.length; i++) {
        sum = sum * 10 + parseInt(s[i]);
        console.log('sum:', sum, 'i:', i,'tot:',tot)
        if (tot + sum > target) {
            break;
        }
        if (dfs(s, i + 1, tot + sum, target)) {
            return true;
        }
    }
    return false;
}

console.log(dfs('1296', 0, 0, 36))


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
var maxArea = function (h, w, horizontalCuts, verticalCuts) {

};


// 2558. 从数量最多的堆取走礼物

/**
 * @param {number[]} gifts
 * @param {number} k
 * @return {number}
 */
var pickGifts = function (gifts, k) {
    let ary = gifts
    ary.sort((a, b) => b - a)
    console.log(ary)
    while (k > 0) {
        let x = ary.shift()
        ary.push(Math.floor(Math.sqrt(x)))
        ary.sort((a, b) => b - a)
        k--
    }
    let res = 0
    console.log(ary)
    while (ary.length > 0) {
        res += ary.shift()
    }
    return res
};

// 30.串联所有单词的子串

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
// 输入：s = "barfoothefoobarman", words = ["foo","bar"]
// 输出：[0,9]
// 解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
// 子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
// 子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
// 输出顺序无关紧要。返回 [9,0] 也是可以的。
var findSubstring = function(s, words) {
    const res = [];
    const m = words.length, n = words[0].length, ls = s.length;
    for (let i = 0; i < n; i++) {
        if (i + m * n > ls) {
            break;
        }
        const differ = new Map();
        for (let j = 0; j < m; j++) {
            const word = s.substring(i + j * n, i + (j + 1) * n);
            differ.set(word, (differ.get(word) || 0) + 1);
        }
        for (const word of words) {
            differ.set(word, (differ.get(word) || 0) - 1);
            if (differ.get(word) === 0) {
                differ.delete(word);
            }
        }
        for (let start = i; start < ls - m * n + 1; start += n) {
            if (start !== i) {
                let word = s.substring(start + (m - 1) * n, start + m * n);
                differ.set(word, (differ.get(word) || 0) + 1);
                if (differ.get(word) === 0) {
                    differ.delete(word);
                }
                word = s.substring(start - n, start);
                differ.set(word, (differ.get(word) || 0) - 1);
                if (differ.get(word) === 0) {
                    differ.delete(word);
                }
            }
            if (differ.size === 0) {
                res.push(start);
            }
        }
    }
    return res;
};



