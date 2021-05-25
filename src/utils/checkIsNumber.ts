function checkIsNumber(value: string | number):boolean {
    let reg:RegExp = /^[0-9]+.?[0-9]*/; //判断是否是数字。
    if(reg.test(value.toString()) ){
        return true;
    }else{
        return false;
    }
}

export default checkIsNumber;