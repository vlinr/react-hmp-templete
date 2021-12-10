/******
 * 
 * 全局头配置文件
 * 
 * ****/
import { USER_TOKEN_NAME } from "./config";

const HEADERS = ()=>{
    return {
        'Authorization':'Bearer '+(localStorage.getItem(USER_TOKEN_NAME) || null)
    }
}

export default HEADERS;