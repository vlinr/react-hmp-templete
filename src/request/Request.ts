import qs from 'qs';
import HEADERS from '@/config/header.config';
import {DOMAIN} from '@/config/api.config';
import checkHaveNetwork from '@/utils/checkHaveNetwork';
export interface RequestParams {
    url?: string  //请求的前缀，也就是域名，如果使用通用域名则可以不传
    api?: string,  //请求的api
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

type RequestConfigType = {
    target:string,
    headers:any,
    cors?:boolean,
    timeout?:number
}

const DEFAULT_PARAMS: RequestParams = {
    url: DOMAIN,
    api: '',
    method: 'get',
    data: {},
    dataType: 'json',
    requestType:'',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        ...HEADERS()
    },
    cors: true,
    timeout:5000,
    useCustomHeader:true
}


class Request {
    //请求参数
    private requestParams: RequestParams = DEFAULT_PARAMS;
    private controller:AbortController = new AbortController();
    constructor(params: RequestParams,callback?:Function) {
        this.requestParams.headers = {
            ...DEFAULT_PARAMS.headers,
            ...HEADERS()
        }
    
        this.requestParams = {...this.requestParams,...this.mergeRequestConfig(params)};
        if(callback){
            this.fetch().then(res=>{
                callback(res);
            }).catch(err=>{
                callback(err);
            })
        }
    }

    /*****
     * 
     * @method 合并请求头
     * 
     * 
     * *****/
    private mergeRequestConfig(params:RequestParams):RequestParams{
        let RequestConfig:any = (window as any)?.RequestConfig;
        if(RequestConfig){ 
            let findKey:string = ''; 
            for(let key in RequestConfig){
                if(key === `/${params.api?.split('/')?.[1]}`){
                    findKey = key;
                    break;
                }
            }
            if(findKey){
                let findObj:RequestConfigType = RequestConfig[findKey]; 
                let rex:RegExp = new RegExp(`${findKey}`);
                if(findObj?.target?.slice(-1) === '/'){
                    findObj.target = findObj.target.substring(0,findObj.target.length-1);
                }
                params.api = params.api?.replace(rex,findObj?.target);
                params.cors = findObj?.cors || params.cors || DEFAULT_PARAMS.cors;
                params.headers = findObj?.headers || params.headers || DEFAULT_PARAMS.headers;
                params.timeout = findObj?.timeout || params.timeout || DEFAULT_PARAMS.timeout;
                if(params?.headers){
                    params.useCustomHeader = true;
                }
            }
        }
        return params;
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
                tipmsg:'network error！'
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
}

export default Request;