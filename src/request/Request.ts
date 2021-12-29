import HEADERS from '@/config/header.config';
import { DOMAIN } from '@/config/api.config';
import checkHaveNetwork from '@/utils/checkHaveNetwork';
import serializeParams from '@/utils/serializeParams';
// import qs from 'qs';
const AbortController = window.AbortController;
export type RequestParams = {
    url?: string; // 请求的前缀，也就是域名，如果使用通用域名则可以不传
    api: string; // 请求的api
    method?: string; // 请求的方式
    cors?: boolean; // 是否跨域共享资源
    headers?: any; // 设置请求头，一个对象
    data?: any; // 请求数据，一个对象
    dataType?: string; // 数据类型
    useCustomHeader?: boolean; // 使用自定义header
    requestType?: string; // 请求类型,文件
    timeout?: number; // 超时时间
    filterHeader?: FilterType<any>;
    responseType?: 'json' | 'text' | 'blob';
};

export type Headers = {
    'user-agent'?: string;
    'content-type'?: string;
};

const DEFAULT_PARAMS: RequestParams = {
    url: DOMAIN,
    api: '',
    method: 'get',
    data: {},
    dataType: 'json',
    requestType: '',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
        ...HEADERS(),
    },
    cors: true,
    timeout: 30000,
    useCustomHeader: true,
    filterHeader: {
        'content-type': '',
    },
    responseType: 'json',
};

// type ResultType = {
//     code: string;
//     data: Array<any> | null;
//     tipmsg: string;
// };

// type ResultType = {
//     data:any,
//     errMsg:string,
//     errno:number,
//     responseId:string,
//     serviceTime:number
// }

type ConfigType = {
    context: [] | string;
    headers: {
        [key: string]: string | null | undefined | number | boolean;
    };
    target: string;
    cors?: boolean;
    timeout?: number;
};

type ReplaceInfoType = {
    api: string;
    params: { [key: string]: any } | any[];
};

type FilterType<T> = {
    [key: string]: T;
};

class Request {
    private requestParams: RequestParams = DEFAULT_PARAMS;
    private controller: AbortController = new AbortController();
    constructor(params: RequestParams, callback?: (params: any) => void) {
        this.init(params, callback);
    }
    /**
     *
     * @method 初始化
     *
     * ****/
    private init(params: RequestParams, callback?: (params: any) => void) {
        this.requestParams.headers = {
            ...DEFAULT_PARAMS.headers,
            ...HEADERS(),
        };
        params = { ...params, ...this.splitRequestMethod(params) };
        this.requestParams = {
            ...this.requestParams,
            ...this.mergeRequestConfig(params),
        };
        this.requestParams.headers = {
            ...this.filterHeaders(
                {
                    ...DEFAULT_PARAMS.filterHeader,
                    ...params.filterHeader,
                },
                this.requestParams.headers,
            ),
        };
        const replaceInfo: ReplaceInfoType = this.replacePath(
            this.requestParams.api,
            this.requestParams.data,
        );
        this.requestParams.api = replaceInfo.api;
        this.requestParams.data = replaceInfo.params;
        if (callback) {
            this.fetch()
                .then((res) => {
                    callback(res);
                })
                .catch((err) => {
                    callback(err);
                });
        }
    }

    /**
     *
     * @method 过滤相应header
     *
     * @params filter:FilterType<any> | FilterType<any>[]  需要过滤的key，value
     * @params header:{[key:string]:any}
     *
     * ****/

    private filterHeaders(filter: FilterType<any>, headers: { [key: string]: any }) {
        const keys: string[] = Object.keys(headers);
        const filterKeys: string[] = Object.keys(filter);
        keys.forEach((item: string) => {
            for (let i: number = 0; i < filterKeys.length; i++) {
                const fItem: string = filterKeys[i];
                if (
                    fItem?.toLowerCase() === item.toLowerCase() &&
                    headers?.[`${item}`] === filter[fItem]
                ) {
                    delete headers?.[`${item}`];
                    break;
                }
            }
        });
        return headers || {};
    }

    /**
     *
     * @method 匹配路径传惨
     *
     * ****/
    private replacePath(path: string, ...params: any): ReplaceInfoType {
        if (params?.length === 1 && typeof params[0] === 'object') {
            const newParams: { [key: string]: any } = {};
            for (const key in params[0]) {
                const newPath: string = path.replace(
                    new RegExp('\\{' + key + '\\}', 'g'),
                    params[0][key],
                );
                if (newPath === path) {
                    newParams[key] = params[0][key];
                } else {
                    path = newPath;
                }
            }
            return {
                api: path,
                params: newParams,
            };
        } else if (params?.length === 1 && params?.[0] === undefined) {
            return {
                api: path,
                params: {},
            };
        } else {
            const newParams: any[] = [];
            for (let i = 0; i < params.length; i++) {
                const newPath: string = path.replace(new RegExp('\\{' + i + '\\}', 'g'), params[i]);
                if (newPath === path) {
                    newParams.push(params[i]);
                } else {
                    path = newPath;
                }
            }
            return {
                api: path,
                params: newParams,
            };
        }
    }

    /*
     *
     * @method 获取是否有请求方式
     *
     * ****/
    private splitRequestMethod(params: RequestParams): {
        api?: string;
        method?: string;
    } {
        const v: Array<string> | undefined = params?.api?.split('|');
        return {
            api: v?.[0] || params.method,
            method: v?.[1] || params.method,
        };
    }

    /*
     *
     * @method 合并请求头
     *
     *
     * *****/
    private mergeRequestConfig(params: RequestParams): RequestParams {
        const win: any = window;
        const RequestConfig: [] = win?.RequestConfig;
        if (RequestConfig) {
            let findItem: ConfigType | null = null,
                key: string = '';
            for (let i: number = 0; i < RequestConfig?.length; ++i) {
                const item: ConfigType = RequestConfig[i];
                key = this.getMatchPermissions(item?.context, params.api || '');
                if (key) {
                    findItem = item;
                    break;
                }
            }
            if (findItem) {
                if (findItem?.target?.slice(-1) === '/')
                    findItem.target = findItem.target.substring(0, findItem.target.length - 1);
                if (key?.slice(0, 1) !== '/') key = `/${key}`;
                if (params?.api?.slice(0, 1) !== '/') params.api = `/${params.api}`;
                const rex: RegExp = new RegExp(`${key}`);
                params.api = params.api?.replace(rex, findItem?.target);
                params.cors = findItem?.cors || params.cors || DEFAULT_PARAMS.cors;
                params.headers = {
                    ...(params.headers || DEFAULT_PARAMS.headers),
                    ...findItem?.headers,
                };
                params.timeout = findItem?.timeout || params.timeout || DEFAULT_PARAMS.timeout;
                if (params?.headers) {
                    params.useCustomHeader = true;
                }
            }
        }
        return params;
    }

    /**
     *
     * @method 获取代理路径匹配度
     *
     * 说明:如果路径前缀一样，优先匹配最先匹配到的
     * @param context:{Array<string> | string}：需要匹配的路径集合
     * @param matchKey:{string}:需要匹配的key
     * *****/
    private getMatchPermissions(context: Array<string> | string, matchKey: string): string {
        let result: string = '';
        if (Array.isArray(context)) {
            for (let i: number = 0; i < context.length; ++i) {
                if (this.match(context[i], matchKey)) {
                    result = context[i];
                    break;
                }
            }
        } else {
            result = (this.match(context, matchKey) && context) || '';
        }
        return result;
    }

    /**
     *
     * @method 匹配
     *
     * @param context:{string}:代理key
     * @param key:{string}:需要替换的key
     *
     * *****/
    private match(context: string, key: string): boolean {
        let arr1: Array<string> = context.split('/');
        let arr2: Array<string> = key.split('/');
        arr1 = (arr1?.[0] === '' && arr1.slice(1)) || arr1;
        arr2 = (arr2?.[0] === '' && arr2.slice(1)) || arr2;
        let result: boolean = true;
        for (let i: number = 0; i < arr1.length; ++i) {
            if (i < arr2.length && arr2[i] !== arr1[i]) {
                result = false;
                break;
            }
        }
        return result;
    }

    /*
     *
     * @method 请求数据
     *
     * ***/
    public fetch(): Promise<any> {
        if (!checkHaveNetwork()) return this.checkHaveNetwork();
        if (this.requestParams.method?.toLocaleLowerCase() === 'get') {
            let data: string = serializeParams(this.requestParams.data);
            data = data ? '?' + data : '';
            return this.fetchData(
                this.requestParams.requestType !== ''
                    ? `${this.requestParams.api}${data}`
                    : `${this.requestParams.url}${this.requestParams.api}${data}`,
                this.getFetchParams(),
            );
        }
        return this.fetchData(
            this.requestParams.requestType !== ''
                ? `${this.requestParams.api}`
                : `${this.requestParams.url}${this.requestParams.api}`,
            this.getFetchParams(true),
        );
    }

    /**
     * @method 检查是否有网络
     *
     * ******/
    private checkHaveNetwork<ResultType>(): Promise<ResultType> {
        return new Promise<ResultType>((resolve) => {
            const result: any = {
                code: '-99999999',
                data: [],
                tipmsg: 'network error！',
            };
            resolve(result);
        });
    }

    /**
     *
     * @method 获取请求参数
     * @param haveBody:{boolean} 是否又body体，对于get是url传参
     *
     * ****/
    private getFetchParams(haveBody: boolean = false): RequestParams {
        const obj: any = {};
        for (const key in this.requestParams.headers) {
            if (
                key.toLocaleLowerCase() === 'content-type' &&
                this.requestParams.headers[key] === null
            ) {
                delete this.requestParams.headers[key];
            }
        }
        obj.headers = this.requestParams.useCustomHeader
            ? new Headers(this.requestParams.headers)
            : undefined;
        obj.method = this.requestParams.method;
        obj.mode = this.requestParams.cors ? 'cors' : 'no-cors';
        if (haveBody) {
            if (this.requestParams.dataType === 'json') {
                obj.body = JSON.stringify(this.requestParams.data);
            } else if (this.requestParams.dataType === 'form-data') {
                const formData: FormData = new FormData();
                for (const key in this.requestParams.data) {
                    formData.append(key, this.requestParams.data[key]);
                }
                obj.body = formData;
            } else {
                obj.body = this.requestParams.data;
            }
        }
        return obj;
    }

    /**
     * @method 获取数据
     * @param api:{string}：请求api
     * @param params:{RequestParams} 请求的参数信息
     * ***/
    private fetchData<T>(api: string, params: RequestParams): Promise<T> {
        return new Promise((resolve: (res: any) => void, reject: (err: any) => void) => {
            try {
                const timeout: number = this.requestTimeout(resolve);
                fetch(api, { ...params, signal: this.controller.signal })
                    .then((res) => {
                        clearTimeout(timeout);
                        if (this.requestParams.requestType !== '') {
                            return {
                                errno: res?.status?.toString(),
                                data: [],
                                errMsg: '',
                            };
                        }
                        if (res.ok) {
                            if (this.requestParams.responseType === 'text') return res?.text?.();
                            else if (this.requestParams.responseType === 'blob')
                                return res?.blob?.();
                            return res?.json?.();
                        }
                        return {
                            errno: res?.status?.toString(),
                            errMsg: res?.statusText,
                        };
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        clearTimeout(timeout);
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     *
     * @method 取消请求
     *
     * ******/
    public cancelRequest() {
        if (this.controller.signal.aborted) throw new DOMException('Aborted', 'AbortError');
        this.controller.abort();
    }

    /**
     * @method 请求超时
     * @param callback:{Function} 请求超时回调
     * ***/
    private requestTimeout(callback: (res: any) => void) {
        const timeout: any = setTimeout(() => {
            callback({
                code: '504',
                data: '',
                tipmsg: 'fetch timeout',
            });
            this.cancelRequest();
        }, this.requestParams.timeout);
        return timeout;
    }

    /**
     *
     * @method 登录失效，需要从新登录
     *
     * ****/
    public tokenOverdue() {
        return this;
    }

    /**
     *
     * @method 刷新token
     *
     * *****/
    public refreshToken() {
        return this;
    }
}

export default Request;
