/**
 * /*
 *
 * ***
 *
 * @format
 * @method 参数序列化
 * @param params:{SerializeParamsType}：参数对象
 */

type SerializeParamsType = {
    [paramsName: string]: any;
};

function serializeParams(params: SerializeParamsType): string {
    let result: string = '';
    if (typeof params === 'object' && params !== null) {
        for (const key in params) {
            result += `${key}=${params[key]}&`;
        }
        result = result.substring(0, result.length - 1);
    }
    return result;
}

export default serializeParams;
