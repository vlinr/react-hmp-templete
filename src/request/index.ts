import Request, { RequestParams } from './Request';

function request(params: RequestParams, callback?: Function) {
    if (callback) return new Request(params, callback);
    return new Request(params).fetch();
}

export default request;
