import Request, { RequestParams } from './Request';

function request(params: RequestParams, callback?: (res: any) => void) {
    if (callback) return new Request(params, callback);
    return new Request(params).fetch();
}

export default request;
