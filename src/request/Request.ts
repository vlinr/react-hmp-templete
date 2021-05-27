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
    useCustomHeader?:boolean //使用自定义header
    requestType?:string, //请求类型,文件
    timeout?:number  //超时时间
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
    timeout:5000,
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
    private controller:AbortController = new AbortController();
    constructor(params: RequestParams,callback?:Function) {
        this.requestParams = {...this.requestParams,...params};
        this.requestParams.headers['TIMESTAMP'] = new Date().getTime();// 时间戳
        this.requestParams.headers['JJG-TRACEID'] = createUUID();  //生成一个UUID
        this.userInfo = localStorage.getItem('USER_INFO');
        if(this.userInfo){
            this.userInfo = JSON.parse(this.userInfo);
        }
        this.requestParams.headers['Authorization'] = 'Bearer '+this.userInfo?.token || null;  //token信息
        this.requestParams.headers['JJG-USER-ID'] = this.userInfo?.userId || 0;  //token信息
        if(callback){
            this.fetch().then(res=>{
                callback(res);
            }).catch(err=>{
                callback(err);
            })
        }
    }

    /****
     * 
     * @method 请求数据
     * 
     * ***/
    public fetch(): Promise<any> {
        if(!checkHaveNetwork())return this.checkHaveNetwork();
        if(this.requestParams.method?.toLocaleLowerCase() === 'get'){
            return this.fetchData(this.requestParams.requestType !== ''?`${this.requestParams.api}?${qs.stringify(this.requestParams.data)}`:`${this.requestParams.url}${this.requestParams.api}?${qs.stringify(this.requestParams.data)}`,this.getFetchParmas());
        }
        return this.fetchData(this.requestParams.requestType !== ''?`${this.requestParams.api}`:`${this.requestParams.url}${this.requestParams.api}`,this.getFetchParmas(true));
    }

    /****
     * @method 检查是否有网络
     * 
     * ******/
    private checkHaveNetwork():Promise<any>{
        return new Promise((resolve)=>{
            resolve({
                code:'-99999999',
                data:[],
                tipmsg:'网络不可用~'
            })
        });
    }

    /*****
     * 
     * @method 获取请求参数
     * @param haveBody:{boolean} 是否又body体，对于get是url传参
     * 
     * ****/
    private getFetchParmas(haveBody:boolean = false):RequestParams{
        let obj:any = {};
        obj.headers = this.requestParams.useCustomHeader?new Headers(this.requestParams.headers):undefined;
        obj.method = this.requestParams.method;
        obj.mode = this.requestParams.cors ? 'cors' : 'no-cors';
        if(haveBody){
            obj.body = this.requestParams.dataType === 'json' ? JSON.stringify(this.requestParams.data) : this.requestParams.data;
        }
        return obj;
    }

    /*****
     * @method 获取数据
     * @param api:{string}：请求api
     * @param params:{RequestParams} 请求的参数信息
     * ***/
    private fetchData(api:string,params:RequestParams): Promise<any>{
        return new Promise((resolve:Function, reject:Function) => {
            try {
                let timeout = this.requestTimeout(resolve);
                fetch(api, {...params,signal:this.controller.signal}).then(res => {
                    clearTimeout(timeout);
                    if(this.requestParams.requestType !== ''){
                        return {
                            code:res?.status?.toString(),
                            data:[],
                            tipmsg:''
                        }
                    }
                    if(res.ok){
                        return res?.json?.();
                    }
                    return {
                        statusCode:res.status,
                        message:res.statusText
                    };
                })
                .then(async response => {
                    resolve(response);
                }).catch(error => {
                    clearTimeout(timeout);
                    reject(error)
                })
            } catch (error) {
                reject(error);
            }
        })
        
    }
    
    /******
     * 
     * @method 取消请求
     * 
     * ******/
    public cancelRquest(){
        if(this.controller.signal.aborted)throw new DOMException('Aborted', 'AbortError')
        this.controller.abort();
    }

    /**
     * @method 请求超时
     * @param callback:{Function} 请求超时回调
     * ***/
    private requestTimeout(callback:Function){
        let timeout:any = setTimeout(() => {  //超时
            callback({
                code:'504',
                data:'',
                tipmsg:'fetch timeout'
            });
            this.cancelRquest();
        }, this.requestParams.timeout);
        return timeout;
    }

    /******
     * 
     * @method 登录失效，需要从新登录
     * 
     * ****/
    public tokenOverdue(){
        
    }

    /****
     * 
     * @method 刷新token
     * 
     * *****/
    public refreshToken(){
        
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