/**
 * 
 * @class 写入请求相关内容
 * 
 * ****/

class MergeRequest {
    constructor(options) {
        this.options = typeof options === 'string' ? require(options) : options;
    }
   
    init(){
        return this.echo(this.getConfigData(this.getEnvParams()));
    }

    /**
     * 
     * @method 获取使用的配置
     * @param env:{string}：运行环境
     * 
     * **/
    getConfigData(env) {
        let result = null;
        for (let key in this.options) {
            if (key === env || (env === null && key === "")) {
                result = this.options[key];
                break;
            }
        }
        return result;
    }

    /**
    * 
    * @method 获取启动参数
    * 
    * **/
    getEnvParams() {
        let argv = process.argv.splice(2);
        for (let i = 0; i < argv.length; ++i) {
            let item = argv[i];
            if (new RegExp('env=').test(item)) {
                return item.slice(4);
            }
        }
        return null;
    }

    /**
    * 
    * @method 获取内容
    * 
    * **/
    echo(config){
        if(!config)return false;
        return `var RequestConfig = ${JSON.stringify(config)};`
    }
}

module.exports = MergeRequest;