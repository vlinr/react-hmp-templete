import { API } from "@/config/api.config";
import request from "@/request";

//请求api配置
function testServer(params?:any) {
    return request({
        api: API,
        data: params
    });
}

export {
    testServer
}