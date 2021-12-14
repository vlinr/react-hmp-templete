/** *****
 * 
 * @method 检查密码强度是否符合标准
 * @param pwd:{string | number} 密码
 * @param regExp:{RegExp} 其他的正则规范，默认规则：满足大写字母，小写字母，符号，数字至少包含3种，并且长度>=8位
 * 
 * **/
function checkPassword(pwd: string | number, regExp:RegExp):boolean {
    const reg:RegExp = regExp || /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/; 
    if(reg.test(pwd.toString())) {
        return true;
    }else{
        return false;
    }
}

export default checkPassword;