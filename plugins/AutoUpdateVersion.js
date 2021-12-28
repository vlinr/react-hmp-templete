const fs = require('fs');
/**
 * 
 * @class 自动升级版本
 * 
 * ****/

class AutoUpdateVersion {

    constructor(options) {
        this.options = options;
    }

    init() {
        
        if(!this.existsFile()) {
            return false;
        }

        const packageJson = require(this.options);

        packageJson.version = this.computedVersion(packageJson.version);

        this.writeFile(JSON.stringify(packageJson));

        this.formatFile();
        
        return this.echo(packageJson.version);
    }

    /**
     * 
     * @method 计算版本号
     * 
     */
    computedVersion(version) {
        if(version) {
            const versionList = version.split('.');
            versionList[versionList.length - 1] = Number(versionList[versionList.length - 1]) + 1;
            return versionList.join('.');
        }else{
            return '1.0.0';
        }
    }

    /**
     * 
     * @method 写入文件
     * 
     */

     writeFile(data) {
        const result = fs.writeFileSync(this.options, data, 'utf-8');
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @method 文件是否存在
     * 
     */
     existsFile() {
        const result = fs.existsSync(this.options);
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @method 格式化文件
     * 
     */
     formatFile() {
        const exec = require('child_process').exec;
        const cmd = `npx prettier -w ${this.options}`;
        exec(cmd, (err, stdout) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`\n%cThe version file was updated successfully, by ${stdout}`, 'color:green');
            }
        });
    }

    /**
     * 
     * @method 输出版本号
     * 
     */
     echo(version) {
        return `(()=>{
            window.console.log('%cSystem version：${version}','text-shadow: 5px 3px 3px rgba(126, 100, 185, .5), 2px 1px 2px rgba(176, 129, 191, 0.2), 2px 2px 3px rgba(133, 223, 223, .1), 4px 1px 2px rgba(126, 100, 185, 0.3);padding: 20px 10px;font-size: 1.5em;font-weight: 500;background: linear-gradient(40deg, #7e64b9, #b081bf 20%, #85dfdf);-webkit-background-clip: text;color: transparent');
        })();`;
    }
}

module.exports = AutoUpdateVersion;