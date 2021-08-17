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

type ResultType = {
    code:string,
    data:Array<any> | null,
    tipmsg:string
}

type ConfigType = {
    context:[] | string,
    headers:{
        [key:string]:string | null | undefined | number | boolean
    },
    target:string,
    cors?:boolean,
    timeout?:number
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
        params = {...params,...this.splitRequestMethod(params)};
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
     * @method 获取是否有请求方式
     * 
     * ****/
    private splitRequestMethod(params:RequestParams):{api?:string,method?:string}{
        let v:Array<string> | undefined = params?.api?.split('|');
        return {
            api:v?.[0] || params.method,
            method:v?.[1] || params.method
        }
    }

    /*****
     * 
     * @method 合并请求头
     * 
     * 
     * *****/
    private mergeRequestConfig(params:RequestParams):RequestParams{
        let RequestConfig:[] = (window as any)?.RequestConfig;  //取得参数
        if(RequestConfig){ 
            let findItem:ConfigType | null = null,key:string = ''; 
            for(let i:number=0;i<RequestConfig?.length;++i){
                let item:ConfigType = RequestConfig[i];  
                key = this.getMatchPermissions(item?.context,params.api || '');
                if(key){
                    findItem = item;
                    break;
                }
            }
            if(findItem){
                if(findItem?.target?.slice(-1) === '/')findItem.target = findItem.target.substring(0,findItem.target.length-1);
                if(key?.slice(0,1) !== '/')key = `/${key}`;
                if(params?.api?.slice(0,1) !== '/')params.api = `/${params.api}`;
                let rex:RegExp = new RegExp(`${key}`);
                params.api = params.api?.replace(rex,findItem?.target);
                params.cors = findItem?.cors || params.cors || DEFAULT_PARAMS.cors;
                params.headers = {...(params.headers || DEFAULT_PARAMS.headers),...findItem?.headers};
                params.timeout = findItem?.timeout || params.timeout || DEFAULT_PARAMS.timeout;
                if(params?.headers){
                    params.useCustomHeader = true;
                }
            }
        }
        return params;
    }

    /*****
     * 
     * @method 获取代理路径匹配度
     *          
     * 说明:如果路径前缀一样，优先匹配最先匹配到的
     * @param context:{Array<string> | string}：需要匹配的路径集合
     * @param matchKey:{string}:需要匹配的key
     * *****/
    private getMatchPermissions(context:Array<string> | string,matchKey:string):string{
        let result:string= '';
        if(Array.isArray(context)){ //需要把第一个是 / 和第一个不是 / 的情况给统一
            for(let i:number=0;i<context.length;++i){
                if(this.match(context[i],matchKey)){
                    result = context[i];
                    break;
                }
            }
        }else{
            result = this.match(context,matchKey) && context || '';
        }
        return result;
    }

    /****
     * 
     * @method 匹配
     * 
     * @param context:{string}:代理key
     * @param key:{string}:需要替换的key
     * 
     * *****/
    private match(context:string,key:string):boolean{
        let arr1:Array<string> = context.split('/'); 
        let arr2:Array<string> = key.split('/');
        arr1 = arr1?.[0]==="" && arr1.slice(1) || arr1;
        arr2 = arr2?.[0]==="" && arr2.slice(1) || arr2;
        let result:boolean = true;
        for(let i:number=0;i<arr1.length;++i){
            if(i < arr2.length && arr2[i] !== arr1[i]){
                result = false;
                break;
            }
        }
        return result;
    }

    /****
     * 
     * @method 请求数据
     * 
     * ***/
    public fetch(): Promise<any> {
        if(!checkHaveNetwork())return this.checkHaveNetwork();
        if(this.requestParams.method?.toLocaleLowerCase() === 'get'){
            return this.fetchData(this.requestParams.requestType !== ''?`${this.requestParams.api}?${qs.stringify(this.requestParams.data)}`:`${this.requestParams.url}${this.requestParams.api}?${qs.stringify(this.requestParams.data)}`,this.getFetchParams());
        }
        return this.fetchData(this.requestParams.requestType !== ''?`${this.requestParams.api}`:`${this.requestParams.url}${this.requestParams.api}`,this.getFetchParams(true));
    }

    /****
     * @method 检查是否有网络
     * 
     * ******/
    private checkHaveNetwork<ResultType>():Promise<ResultType>{
        return new Promise<ResultType>((resolve)=>{
            resolve({
                code:'-99999999',
                data:[],
                tipmsg:'network error！'
            } as any)
        });
    }

    /*****
     * 
     * @method 获取请求参数
     * @param haveBody:{boolean} 是否又body体，对于get是url传参
     * 
     * ****/
    private getFetchParams(haveBody:boolean = false):RequestParams{
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
    private fetchData<T>(api:string,params:RequestParams): Promise<T>{
        return new Promise((resolve:Function, reject:Function) => {
            try {
                let timeout:number = this.requestTimeout(resolve);
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
    public cancelRequest(){
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
            this.cancelRequest();
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