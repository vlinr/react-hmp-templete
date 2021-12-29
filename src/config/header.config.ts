import { USER_TOKEN_NAME } from './config';
/**
 *
 * @function 全局头配置文件
 *
 * ***/
const HEADERS = () => {
    return {
        Authorization: localStorage.getItem(USER_TOKEN_NAME) || null,
    };
};

export default HEADERS;
