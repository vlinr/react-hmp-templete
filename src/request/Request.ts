import qs from 'qs';
import HEADER from '@/config/header.config';
import createUUID from '@/utils/createUUID';
import {DOMAIN} from '@/config/api.config';
import checkHaveNetwork from '@/utils/checkHaveNetwork';
export interface RequestParams {
    url?: string  //请求的前缀，也就是域名，如果使用通用域名则可以不传
    api: string,  //请求的api
    method?: string, //请求的方式
    cors?: boolean, //是否跨域共享资源
    headers?: any,  //设置请求头，一个对象
    data?: any, //请求数据，一个对象
    dataType?: string //数据类型
    useCustomHeader?:boolean
    requestType?:string
}

export interface Headers {
    'user-agent'?: string,
    'content-type'?: string
}

const DEFAULT_PARAMS: RequestParams = {
    url: DOMAIN,
    api: '',
    method: 'get',
    data: '',
    dataType: 'json',
    requestType:'',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        // "Content-Security-Policy:":"default-src 'self'", //electron 2.X进行设置
        ...HEADER
    },
    cors: true,
    useCustomHeader:true
}

// Authorization                            #认证token  
// APP-NAME                                 #应用名称【string小写】示例：jjg_miniprogram
// APP-ID                                   #应用id示例：3
// APP-VERSION                              #应用版本【string】示例：1.0.0
// APP-VERSION-NUM                          #应用版本数值【int】30100(三位版本号，每位算2位数字，非首位版本不足两位数用0填充，如：1.12.35=11235，2.4.12=20412)
// APP-LEVEL                                #层级计数器
// SOURCE-APP-NAME                          #源APP-NAME,主要是配合Authorization代理验证
// APP-DEVICE-UUID                          #应用设备唯一ID,应用安装在当前设备下的唯一标识，若个别设备无法获取设备唯一ID，可以自己用户和设备进行唯一生成储存【string小写】,示例：8e2e78d2-9139-4f10-a7e5-d6626af8fa6d
// APP-DEVICE-MANUFACTURER                  #应用设备制造商【string小写】，示例：apple （web传浏览器相关数据）
// APP-DEVICE-TYPE                          #应用设备系统类型【string小写】，示例：ios，android，windows,mac,ipad,... （web传浏览器相关数据）
// APP-DEVICE-MODEL                         #应用设备型号【string小写】，示例：iphone6
// APP-DEVICE-VERSION                       #应用设备系统版本【string】,示例：12.0.3
// APP-DEVICE-VERSION-NUM                   #应用设备系统版本数字化【int】,示例：120003 (三位版本号，每位算2位数字，非首位版本不足两位数用0填充，如：1.12.35=11235，2.4.12=20412)
// APP-UA                                   #屏幕信息
// JJG-TRACEID                              #请求(日志)唯一ID数据保证唯一，用户日志收集链路跟踪【string小写】，示例：8e2e78d2-9139-4f10-a7e5-d6626af8fa6d
// JJG-NETWORK                              #网络模式【string小写】,示例：wifi,3g,4g,5g,...
// JJG-USER-ID                              #节节高用户ID【string】,未登录用户为0，示例：1922924
// TIMESTAMP                                #【string毫秒】,请求时间戳，示例：1597819754574

class Request {
    //请求参数
    private requestParams: RequestParams = DEFAULT_PARAMS;
    private userInfo:any = null;
    constructor(params: RequestParams) {
        this.requestParams = {...this.requestParams,...params};
        this.requestParams.headers['TIMESTAMP'] = new Date().getTime();// 时间戳
        this.requestParams.headers['JJG-TRACEID'] = createUUID();  //生成一个UUID
        this.userInfo = localStorage.getItem('USER_INFO');
        if(this.userInfo){
            this.userInfo = JSON.parse(this.userInfo);
        }
        this.requestParams.headers['Authorization'] = 'Bearer '+this.userInfo?.token || null;  //token信息
        this.requestParams.headers['JJG-USER-ID'] = this.userInfo?.userId || 0;  //token信息
    }


    /****
     * 
     * @method 请求数据
     * 
     * ***/
    public fetch(): Promise<any> {
        const {onLine} = checkHaveNetwork(); //检查网络是否正常
        if(!onLine){  //无网
            return new Promise((resolve)=>{
                resolve({
                    code:'-99999999',
                    data:[],
                    tipmsg:'网络不可用~'
                })
            });
        }
        //需要去校验token是否已经过期或者可以刷新
        return new Promise((resolve, reject) => {
            try {
                this.requestParams.method?.toLocaleLowerCase() === 'get' ?
                    fetch(this.requestParams.requestType !== ''?`${this.requestParams.api}?${qs.stringify(this.requestParams.data)}`:`${this.requestParams.url}${this.requestParams.api}?${qs.stringify(this.requestParams.data)}`, {
                        headers: this.requestParams.useCustomHeader?new Headers(this.requestParams.headers):undefined,
                        method: this.requestParams.method,
                        mode: this.requestParams.cors ? 'cors' : 'no-cors'
                    }).then(res => {
                        // if(res?.status?.toString() === UPLOAD_SUCCESS_CODE && this.requestParams.requestType !== ''){
                        //     return {
                        //         code:UPLOAD_SUCCESS_CODE,
                        //         data:[],
                        //         tipmsg:''
                        //     }
                        // }
                        if(res.ok){
                            return res?.json?.();
                        }
                        return {
                            statusCode:res.status,
                            message:res.statusText
                        };
                    })
                    .then(async response => {
                        // if(response?.code === REFRESH_TOKEN_CODE){
                        //     this.refreshToken().then((refresh:any)=>{
                        //     if(refresh){ //刷新成功
                        //         this.fetch(); //从新调用
                        //     }else{ //刷新失败
                        //         this.tokenOverdue();
                        //     }
                        //     }); //刷新token
                        // }else if(response?.code === TOKEN_MORE_THEN_TIME){ //过期
                        //     this.tokenOverdue();
                        // }else{
                        //     resolve(response);
                        // }
                        resolve(response);
                    }).catch(error => {
                        reject(error)
                    })
                    :
                    fetch(this.requestParams.requestType !== ''?`${this.requestParams.api}`:`${this.requestParams.url}${this.requestParams.api}`, {
                        headers: this.requestParams.useCustomHeader?new Headers(this.requestParams.headers):undefined,
                        method: this.requestParams.method,
                        body: this.requestParams.dataType === 'json' ? JSON.stringify(this.requestParams.data) : this.requestParams.data, // data can be `string` or {object}!
                        mode: this.requestParams.cors ? 'cors' : 'no-cors'
                    }).then(res => {
                        // if(res?.status?.toString() === UPLOAD_SUCCESS_CODE && this.requestParams.requestType !== ''){
                        //     return {
                        //         code:UPLOAD_SUCCESS_CODE,
                        //         data:[],
                        //         tipmsg:''
                        //     }
                        // }
                        if(res.ok){
                            return res?.json?.();
                        }
                        return {
                            code:res.status,
                            data:[],
                            tipmsg:res.statusText
                        };
                    })
                    .then(async response => {
                        resolve(response);
                        // if(response?.code === REFRESH_TOKEN_CODE){
                        //     this.refreshToken().then((refresh:any)=>{
                        //     if(refresh){ //刷新成功
                        //         this.fetch(); //从新调用
                        //     }else{ //刷新失败
                        //         this.tokenOverdue();
                        //     }
                        //     }); //刷新token
                        // }else if(response?.code === TOKEN_MORE_THEN_TIME){ //过期
                        //     this.tokenOverdue();
                        // }else{
                        //     resolve(response);
                        // }
                    }).catch(error =>{
                        reject(error)
                    });
            } catch (error) {
                reject(error);
            }
        })
    }
    /******
     * 
     * @method 登录失效，需要从新登录
     * 
     * ****/
    public tokenOverdue(){
        //登录失效二次开发
    }
    /****
     * 
     * @method 刷新token
     * 
     * *****/
    public refreshToken(){
        // return new Promise((resolve,reject)=>{
        //     new Request({
        //         api: REFRENSH_TOKEN,
        //         method: 'POST',
        //         data: {
        //             json:this.userInfo?.token
        //         }
        //     }).fetch().then((res:any)=>{
        //         if(res?.code === REQUEST_SUCCESS){
        //             this.userInfo.token = res?.data?.token;
        //             localStorage.setItem('USER_INFO',JSON.stringify(this.userInfo));
        //             resolve(true);
        //         }else{
        //             resolve(false);
        //         }
        //     }).catch((res:any)=>{
        //         resolve(false);
        //     });
        // })
    }
    /****
     * 
     * @method 参数序列化
     * 
     * *****/
    public serializeParams(params:any):string{
        let result:string = '';
        if(typeof params === 'object' && params != null){
            for(let key in params){
                result += `${key}=${params[key]}&`;
            }
            result = result.substring(0,result.length - 1);
        }
        return result;
    }
}

export default Request;