
function checkObjectHaveKey(obj:any, findKey:string = ''):boolean {
    if(typeof obj !== 'object')return  false; // 不是对象
    if(!findKey) {
        if(JSON.stringify(obj) === '{}')return false;  // 没有key
        return true; // 有key
    }
    for(const key in obj) {
        if(key === findKey) return true;
    }
    return false;
}

export default checkObjectHaveKey;