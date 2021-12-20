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
            '^/api': '/',
        },
    },
    // bypass: (req) => {
    //     // 代理请求是html文件时，并且请求路径不包含test的路径，就不使用代理
    //     if (req.headers.accept.indexOf('html') !== -1 && req.url.indexOf('test') === -1) {
    //         return '/';
    //     }
    // },
};

module.exports = PROXY_CONFIG;
