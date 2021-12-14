import { API } from '@/config/api.config';
import request from '@/request';

// 数据请求
function testServer(params?: any) {
    return request({
        api: API,
        data: params,
    });
}

export { testServer };
