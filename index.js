var OrderNumber;
(function (OrderNumber) {
    var orderStr = "0123456789abcdefghijklmnopqrstuvwxyz";
    var strLength = orderStr.length;
    OrderNumber.minInSpace = orderStr[0];
    OrderNumber.maxInSpace = orderStr[strLength - 1];

    function compare(a, b) {
        if (getIndex(a) - getIndex(b) > 0) {
            return 1;
        } else if (getIndex(a) - getIndex(b) < 0) {
            return -1;
        } else {
            return 0;
        }
    }
    OrderNumber.compare = compare;

    function between(a, b, count) {
        if (compare(a, OrderNumber.minInSpace) === -1 || b[0] === OrderNumber.maxInSpace && b.length > 1) {
            console.error("out of range");
            return;
        }
        if (a.length === b.length) {
            var result = [],
                num = 1;
            var distance = getIndex(b) - getIndex(a);
            if (distance > count) {
                var padding = Math.floor(distance / (count + 1));
                while (count - num >= 0) {
                    result.push(getStrByIndex(getIndex(a) + num * padding));
                    num++;
                }
                return result;
            } else {
                var aScaleIndex = getIndex(a + OrderNumber.minInSpace) + 1,
                    bScaleIndex = getIndex(b + OrderNumber.minInSpace),
                    scaleDistance = bScaleIndex - aScaleIndex;
                if (scaleDistance <= count) {
                    result = between(getStrByIndex(aScaleIndex), getStrByIndex(bScaleIndex - 1), count);
                    return result;
                }
                var padding = Math.floor(scaleDistance / (count + 1));
                while (count - num >= 0) {
                    result.push(getStrByIndex(aScaleIndex + num * padding));
                    num++;
                }
                return result;
            }
        } else if (a.length > b.length) {
            var bScale = b;
            var num = 0;
            while (a.length - b.length - num > 0) {
                bScale += OrderNumber.minInSpace;
                num++;
            };
            return between(a, bScale, count);
        } else if (a.length < b.length) {
            var aScale = a;
            var num = 0;
            while (b.length - a.length - num > 0) {
                aScale += OrderNumber.minInSpace;
                num++;
            };
            return between(aScale, b, count);
        }
    }
    OrderNumber.between = between;

    function getStrByIndex(index) {
        var num = 0,
            str = "";
        if (index < strLength) {
            return orderStr.charAt(index);
        } else {
            var remainder = index % (strLength - 1);
            if (remainder === 0) {
                str = orderStr.charAt(strLength - 1);
                index -= strLength - 1;
            } else {
                str = orderStr.charAt(remainder);
                index -= remainder;
            }
            while (index > 0 && index % ((strLength - 1) * Math.pow(strLength, num)) === 0) {
                var remainder_1 = (index / ((strLength - 1) * Math.pow(strLength, num))) % strLength;
                var word = void 0;
                if (remainder_1 === 0) {
                    word = orderStr.charAt(strLength - 1);
                    index -= (strLength - 1) * Math.pow(strLength, num) * strLength;
                } else {
                    word = orderStr.charAt(remainder_1 - 1);
                    index -= (strLength - 1) * Math.pow(strLength, num) * remainder_1;
                }
                str = word + str;
                num++;
            }
            return str;
        }
    }

    function getIndex(str) {
        var index = 0,
            num = 0;
        while (str[num]) {
            var wordIndex = void 0;
            if (num === str.length - 1) {
                index += orderStr.indexOf(str[num]);
            } else {
                wordIndex = orderStr.indexOf(str[num]);
                index += (wordIndex + 1) * (strLength - 1) * Math.pow(strLength, str.length - 2 - num);
            }
            num++;
        }
        return index;
    }
})(OrderNumber || (OrderNumber = {}));

module.exports = OrderNumber;