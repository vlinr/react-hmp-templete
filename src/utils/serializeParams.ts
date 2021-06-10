/******
 * 
 * @method 参数序列化
 * @param params:{any}：参数对象
 * ****/
function serializeParams(params:any):string {
    let result:string = '';
    if(typeof params === 'object' && params != null){
        for(let key in params){
            result += `${key}=${params[key]}&`;
        }
        result = result.substring(0,result.length - 1);
    }
    return result;
}

export default serializeParams;