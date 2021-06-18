/******
 * 
 * 全局api配置文件
 * 
 * ****/

export const DOMAIN:string = '';  //如果服务器做了正向代理，则无需填写，如果没有做，打包后需要填写

export const SERVER_TYPE_API:string = '/api'; //服务前缀，如果是微服务，一般会有是哪个服务

export const API:string = `${SERVER_TYPE_API}/info`;  //具体的api，服务下面对呀的API



