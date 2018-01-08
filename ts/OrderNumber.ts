type OrderNumber = string
namespace OrderNumber {
    const orderStr = "0123456789abcdefghijklmnopqrstuvwxyz";
    const strLength = orderStr.length;
    const minInSpace = orderStr[0];                 //"0"
    const maxInSpace = orderStr[strLength - 1];     //"z"

    /**
     * a>b => 1
     * a<b =>-1
     * a=b =>0
     * @export
     * @param {OrderNumber} a 
     * @param {OrderNumber} b 
     * @returns {(1 | 0 | -1)} 
     */
    export function compare(a: OrderNumber, b: OrderNumber): 1 | 0 | -1 {
        if (getIndex(a) - getIndex(b) > 0) {
            return 1
        } else if (getIndex(a) - getIndex(b) < 0) {
            return -1
        } else {
            return 0
        }
    }

    /**
     * equally distributed
     * 
     * @static
     * @param {string} a        start
     * @param {string} b        end
     * @param {number} count    between count 
     * @returns {string[]} 
     * @memberof SortClass
     */
    export function between(a: OrderNumber, b: OrderNumber, count: number): OrderNumber[] {
        if (compare(a, minInSpace) === -1 || b[0] === maxInSpace && b.length > 1) {
            console.error("out of range")
            return
        }
        if (a.length === b.length) {
            let result = [],
                num = 1;
            let distance = getIndex(b) - getIndex(a);
            if (distance > count) {
                let padding = Math.floor(distance / (count + 1))
                while (count - num >= 0) {
                    result.push(getStrByIndex(getIndex(a) + num * padding));
                    num++;
                }
                return result
            } else {
                let aScaleIndex = getIndex(a + minInSpace) + 1,
                    bScaleIndex = getIndex(b + minInSpace),
                    scaleDistance = bScaleIndex - aScaleIndex;
                if (scaleDistance <= count) {
                    result = between(getStrByIndex(aScaleIndex), getStrByIndex(bScaleIndex - 1), count);
                    return result
                }
                let padding = Math.floor(scaleDistance / (count + 1))
                while (count - num >= 0) {
                    result.push(getStrByIndex(aScaleIndex + num * padding));
                    num++;
                }
                return result
            }
        } else if (a.length > b.length) {
            let bScale = b;
            let num = 0;
            while (a.length - b.length - num > 0) {
                bScale += minInSpace;
                num++;
            };
            return between(a, bScale, count)
        } else if (a.length < b.length) {
            let aScale = a;
            let num = 0;
            while (b.length - a.length - num > 0) {
                aScale += minInSpace;
                num++;
            };
            return between(aScale, b, count)
        }
    }

    /**
     * SortClass.getStrByIndex(1)="1"
     * SortClass.getStrByIndex(35)="z"
     * SortClass.getStrByIndex(36)="01"
     * @param {number} index 
     * @returns 
     * @memberof SortClass
     */
    function getStrByIndex(index: number) {
        let num = 0,
            str = "";
        if (index < strLength) {
            return orderStr.charAt(index)
        } else {
            let remainder = index % (strLength - 1);
            if (remainder === 0) {
                str = orderStr.charAt(strLength - 1);
                index -= strLength - 1;
            } else {
                str = orderStr.charAt(remainder);
                index -= remainder;
            }

            while (index > 0 && index % ((strLength - 1) * Math.pow(strLength, num)) === 0) {
                let remainder = (index / ((strLength - 1) * Math.pow(strLength, num))) % strLength;
                let word;
                if (remainder === 0) {
                    word = orderStr.charAt(strLength - 1);
                    index -= (strLength - 1) * Math.pow(strLength, num) * strLength;
                } else {
                    word = orderStr.charAt(remainder - 1);
                    index -= (strLength - 1) * Math.pow(strLength, num) * remainder;
                }
                str = word + str;
                num++;
            }
            return str
        }
    }

    /**
     * SortClass.getIndex("z")=35
     * SortClass.getIndex("01")=36
     * @param {string} str 
     * @returns 
     * @memberof SortClass
     */
    function getIndex(str: string) {
        let index = 0,
            num = 0;
        while (str[num]) {
            let wordIndex;
            if (num === str.length - 1) {
                index += orderStr.indexOf(str[num]);
            } else {
                wordIndex = orderStr.indexOf(str[num]);
                index += (wordIndex + 1) * (strLength - 1) * Math.pow(strLength, str.length - 2 - num);
            }
            num++;
        }
        return index
    }
}

console.log(OrderNumber.between("a", "c", 1))
console.log(OrderNumber.between("a", "ai", 1))
console.log(OrderNumber.between("a", "d", 2))
console.log(OrderNumber.between("a", "z", 50))