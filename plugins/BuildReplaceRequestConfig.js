const pluginName = 'BuildReplaceRequestConfig';
const ConcatSource = require('webpack-sources').ConcatSource;
/**
 * 
 * @class 写入请求相关内容
 * 
 * ****/
class BuildReplaceRequestConfig {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let env = this.getEnvParams(), filenames = this.getOutputName(compiler.options.output.filename) || this.getEntryName(compiler.options.entry);
        let config = this.getConfigData(env);
        if (!config) return;
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.optimizeChunkAssets.tap(pluginName, (chunks) => {
                chunks.forEach(chunk => {
                    chunk.files.forEach(fileName => {
                        const asset = compilation.assets[fileName];
                        for (let i = 0; i < filenames.length; ++i) {
                            let item = filenames[i];
                            let rex = new RegExp(`\(${item}|bundle\).*?\.js`);
                            if (rex.test(fileName)) {
                                let configJs = `var RequestConfig = ${JSON.stringify(config)};`;
                                compilation.assets[fileName] = new ConcatSource(
                                    configJs, asset
                                );
                                break;
                            }
                        }
                    })
                });
            })

        });
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
     * @method 获取出入口name
     * @param entry:{any}:入口内容
     * 
     * **/
    getEntryName(entry) {  //入口如果是对象，直接返回所有的key
        let result = [];
        if (entry && entry instanceof Array || typeof (entry) === 'string') {
            result.push('main');
        } else if (entry && typeof entry === 'object') {
            for (let key in entry) { //所有的key
                result.push(key);
            }
        }
        return result;
    }

    /**
     * 
     * @method 获取出口name
     * @param filename:{string}：出口文件名
     * 
     * **/
    getOutputName(filename) {
        if (/[name]/g.test(filename)) return null; //需要使用entry
        let names = filename.split('/');
        return [names[names.length - 1].split('.')[0]];
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
}

module.exports = BuildReplaceRequestConfig;