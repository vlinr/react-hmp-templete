function checkIsPhoneNumber(value: string): boolean {
    const reg: RegExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    // value.replace(/\s/g,'');
    if (!reg.test(value)) {
        return false;
    } else {
        return true;
    }
}
export default checkIsPhoneNumber;