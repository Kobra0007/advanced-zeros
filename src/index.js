module.exports = function getZerosCount(number, base) {

    let dividers = findDivider(base);
    let powsOfDev = dividers.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});

    for (let divider in powsOfDev) {
        powsOfDev[divider] = {
            divider: +divider,
            pow: powsOfDev[divider],
            summ: 0,
        }
    }

    for (let value in powsOfDev) {
        for (let i = powsOfDev[value].divider; number / i >= 1; i = i * powsOfDev[value].divider) {
            powsOfDev[value].summ += Math.floor(number / i);
        }
    }

    let zeros = [];
    for (let value in powsOfDev) {
        zeros.push(Math.floor(powsOfDev[value].summ / powsOfDev[value].pow));
    }
    return Math.min(...zeros);

};

function findDivider(base) {
    let dividerArr = [];
    for (let i = 2; i <= base; i++) {
        while (base % i == 0) {
            dividerArr.push(i);
            base /= i;
        }
    }
    return dividerArr;
}