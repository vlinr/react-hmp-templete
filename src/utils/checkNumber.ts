/** ***
 * 
 * @method 检查是否是数字
 * @param value:{string|number}：需要检查的内容
 * ****/
function checkNumber(value: string | number):boolean {
    return /^[0-9]+.?[0-9]*/.test(value.toString())
}

export default checkNumber;