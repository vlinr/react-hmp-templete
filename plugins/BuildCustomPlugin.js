const pluginName = 'BuildCustomPlugin';
const ConcatSource = require('webpack-sources').ConcatSource;
const AutoUpdateVersion = require('./AutoUpdateVersion.js');
const MergeRequest = require('./MergeRequest.js');
/**
 * 
 * @class 写入请求相关内容
 * 
 * @params options:{
 *      requestConfig:string | object,
 *      updateFilePath:string
 * }
 * 
 * ****/

class BuildCustomPlugin {

    constructor(options) {
        this.options = options;
    }
    
    apply(compiler) {
        if(!this.options.updateFilePath && !this.options.requestConfig){
            return false;
        }

        let filenames = this.getOutputName(compiler.options.output.filename) || this.getEntryName(compiler.options.entry),
            version = null, request = null;
        if(this.options.updateFilePath){
            version = new AutoUpdateVersion(this.options.updateFilePath);
        }
        if(this.options.requestConfig){
            request = new MergeRequest(this.options.requestConfig);
        }
        
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.optimizeChunkAssets.tap(pluginName, (chunks) => {
                chunks.forEach(chunk => {
                    chunk.files.forEach(fileName => {
                        const asset = compilation.assets[fileName];
                        for (let i = 0; i < filenames.length; ++i) {
                            let item = filenames[i];
                            let rex = new RegExp(`\(${item}|bundle\).*?\.js`);
                            if (rex.test(fileName)) {
                                compilation.assets[fileName] = new ConcatSource(
                                    this.mergeJs(request,version), asset
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
     * @method 合并代码
     * 
     * **/
    mergeJs(request,version){
        let requestStr = '',
            versionStr = '';
        if(request){
            requestStr = request.init();
            if(!requestStr)requestStr = '';
        }
        if(version){
            if(version.existsFile()){
                versionStr = version.init();
            }
        }
        return `${requestStr}${versionStr}`;
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
}

module.exports = BuildCustomPlugin;