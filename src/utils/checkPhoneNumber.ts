/** 
 * 
 * @method 检查是否是手机号
 * @param value:{string | number}:需要验证的手机号
 * 
 * *****/
function checkPhoneNumber(value: string | number): boolean {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}
export default checkPhoneNumber;