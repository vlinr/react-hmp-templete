function checkPassword(value: string | number):boolean {
    let reg:RegExp = /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/; 
    if(reg.test(value.toString()) ){
        return true;
    }else{
        return false;
    }
}

export default checkPassword;