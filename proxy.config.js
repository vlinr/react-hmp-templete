
// interface ProxyConfigType {
//     [name:string]:ProxyConfigItemType
// }

// interface ProxyConfigItemType{
//     target:string,
//     changeOrigin?: boolean,
//     secure?: boolean,
//     xfwd?: boolean,
//     pathRewrite?: PathRewriteType,
//     [name:string]:string | boolean | PathRewriteType
// }

// interface PathRewriteType{
//     [name:string]:string | boolean
// }

const PROXY_CONFIG = {
    '/api': {
        target: 'http://test.xxx.com/xxx/', // prod
        changeOrigin: true,
        secure: false,
        xfwd: false,
        pathRewrite: {
            '^/api': '/'
        }
    }
}

module.exports = PROXY_CONFIG;