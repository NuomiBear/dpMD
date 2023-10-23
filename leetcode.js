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