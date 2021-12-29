const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addBabelPlugins,
    addWebpackPlugin,
    // useBabelRc,
    disableChunk,
    adjustWorkbox,
    setWebpackPublicPath,
    addBundleVisualizer,
    // disableEsLint,
    addWebpackExternals,
    // addWebpackModuleRule,
    addWebpackResolve,
    // useEslintRc,
    addPostcssPlugins,
    // addBabelPreset,
    // addTslintLoader
    // addBundleVisualizer
} = require('customize-cra');
const path = require('path');
const apiMocker = require('mocker-api');
const paths = require('react-scripts/config/paths');
// const rewireReactHotLoader = require('react-app-rewire-hot-loader');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const rewireCompressionPlugin = require('react-app-rewire-compression-plugin')
const rewireUglifyjs = require('react-app-rewire-uglifyjs');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const theme = require('./theme.js');
const PROXY = require('./proxy.config.js');
// const chalk = require('chalk');
const BuildCustomPlugin = require('./plugins/BuildCustomPlugin');
const chalk = require('chalk');
// SKIP_PREFLIGHT_CHECK = true
const rewiredMap = () => (config) => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    return config;
};

process.env.PORT = 8888;
process.env.GENERATE_SOURCEMAP !== 'false';

// path
const resolveAlias = (dir) => path.join(__dirname, '.', dir);
const hotLoader = () => (config, env) => {
    config = rewireReactHotLoader(config, env);
    return config;
};
// build--->prod
const appBuildPathFile = () => (config) => {
    if (config.mode === 'development') {
    } else if (config.mode === 'production') {
        // 关闭sourceMap
        config.devtool = false;
        //  // 配置打包后的文件位置修改path目录
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
        config.output.path = path.join(path.dirname(config.output.path), 'dist');

        // if (config.entry && config.entry instanceof Array) {
        //     config.entry = {
        //         main: config.entry,
        //         vendor: ["react", "react-dom", "react-router-dom", "react-redux", "redux", 'react-router-config',
        //             "lodash", "moment", "react-router",
        //         ]
        //     }
        // } else if (config.entry && typeof config.entry === 'object') {
        //     config.entry.vendor = ["react", "react-dom", "react-router-dom", "react-redux", "redux", 'react-router-config',
        //         "lodash", "moment", "react-router",
        //     ];
        // }

        // 添加js打包gzip配置
        // config.plugins.push(
        //   new CompressionWebpackPlugin({
        //     test: /\.js$|\.css$/,
        //     threshold: 1024
        //   })
        // )

        //添加打包需要执行的插件
        config.plugins.push(
            new BuildCustomPlugin({
                requestConfig: require('./request.config'),
                updateFilePath: path.join(__dirname, 'package.json'),
            }),
        );
        // 更改生产模式输出的文件名
        // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
        // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
    }
    return config;
};
//生产环境去除console.* functions
const dropConsole = () => {
    return (config) => {
        if (config.optimization.minimizer) {
            config.optimization.minimizer.forEach((minimizer) => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.terserOptions.compress.drop_console = true;
                }
            });
        }
        return config;
    };
};
/**
 *
 * @description 解决打包的时候如下报错
 * @url{https://github.com/ant-design/ant-design/issues/15696}
 * https://blog.csdn.net/peade/article/details/84890399
chunk 3 [mini-css-extract-plugin]
Conflicting order between:
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/input/style/index.less
 * css ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-7-1!./node_modules/postcss-loader/src??postcss!./node_modules/less-loader/dist/cjs.js??ref--6-oneOf-7-3!./node_modules/antd/es/message/style/index.less
 */
const delConflictingOrder = () => {
    return (config) => {
        for (let i = 0; i < config.plugins.length; i++) {
            const p = config.plugins[i];
            if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
                const miniCssExtractOptions = { ...p.options, ignoreOrder: true };
                config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions);
                break;
            }
        }
    };
};

const addMiniCssExtractPlugin = () => {
    return (config) => {
        config.plugins.unshift(
            new FilterWarningsPlugin({
                // exclude: /any-warnings-matching-this-will-be-hidden/
                // exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
                exclude: /\[mini-css-extract-plugin\][^]*Conflicting order between:/,
            }),
        );
    };
};

/**
 *
 * @function 使用一些自定义配置
 *
 * *****/
// const addCustomWebpackConfig = () => {
//     return config => {
//         config.plugins = (config.plugins || []).concat([
//             new BuildReplaceRequestConfig(require('./request.config')),
//         ]);
//         return config;
//     };
// };

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addWebpackResolve({
            extensions: ['.js', '.json', '.ts', '.tsx'],
        }),
        // addTslintLoader({
        //     tsConfigFile:'tsconfig.config.json',
        //     typeCheck:true,
        //     configFile:true
        // }),
        // addWebpackModuleRule({}),
        addLessLoader({
            // strictMath: true,
            // modifyVars: { ...theme },
            lessOptions: {
                noIeCompat: true,
                javascriptEnabled: true,
                modifyVars: { ...theme },
                modules: true,
            },
            // localIdentName: '[local]--[hash:base64:5]', // 自定义 CSS Modules 的 localIdentName
        }),
        addPostcssPlugins([require('postcss-px2rem')({ remUnit: 14 })]), //rem适配
        // addPostcssPlugins([require("postcss-px-to-viewport")({ viewportWidth: 375 })]), //vw适配
        setWebpackPublicPath(require('./package.json').homepage || ''), // 修改 publicPath
        addWebpackExternals({
            React: 'React',
            lodash: 'Lodash',
        }),
        // addWebpackModules(),
        //相当于lib引入直接 @lib即可
        addWebpackAlias({
            ['@']: resolveAlias('src'),
            ['lib']: resolveAlias('src/lib'),
            ['components']: resolveAlias('src/components'),
            ['images']: resolveAlias('src/assets/images'),
            ['styles']: resolveAlias('src/assets/styles'),
            ['utils']: resolveAlias('src/utils'),
            ['config']: resolveAlias('src/config'),
            ['pages']: resolveAlias('src/pages'),
            ['store']: resolveAlias('src/store'),
            ['hooks']: resolveAlias('src/hooks'),
            ['router']: resolveAlias('src/router'),
            ['locale']: resolveAlias('src/locale'),
            ['layouts']: resolveAlias('src/layouts'),
            ['typing']: resolveAlias('src/typing'),
            ['less']: resolveAlias('src/less'),
            ['service']: resolveAlias('src/service'),
            ['request']: resolveAlias('src/request'),
            // 处理警告  React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
            ['react-dom']: '@hot-loader/react-dom',
            // 解决antd 的icon图标打包体积大
            // '@ant-design/icons': 'purched-antd-icons'
        }),
        //禁用eslint
        // disableEsLint(),
        // useEslintRc(path.resolve(__dirname, './.eslintrc')),
        appBuildPathFile(),
        disableChunk(),
        //打包后删除所有console
        dropConsole(),
        // 关闭mapSource
        rewiredMap(),
        // 热更新
        // hotLoader(), //需要安装和修改index.js
        // 配置babel解析器
        addBabelPlugins(['@babel/plugin-proposal-decorators', { legacy: true }]),
        // 打包编译完成提醒
        addWebpackPlugin(
            // 进度条,写在最前面，后main无效
            new ProgressBarPlugin({
                format: `build [:bar] ${chalk.green(':percent')} (:elapsed seconds)`,
                clear: false,
            }),
        ),
        addWebpackPlugin(
            new WebpackBuildNotifierPlugin({
                title: '模板项目',
                logo: path.resolve('./public/logo.png'),
                suppressSuccess: true,
            }),
        ),
        // addWebpackPlugin(
        //     new MiniCssExtractPlugin({
        //         filename: 'static/css/[name].[contenthash].css',
        //         chunkFilename: 'static/css/[id].[contenthash].css',
        //         ignoreOrder: false,
        //         // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
        //     }),
        // ),
        // addWebpackPlugin(
        //     delConflictingOrder(),
        // ),
        addWebpackPlugin(
            new LodashWebpackPlugin({ collections: true, paths: true }), // 美化控制台
        ),
        // addWebpackPlugin(new CompressionWebpackPlugin()),
        // addWebpackPlugin(addMiniCssExtractPlugin()),
        rewireUglifyjs,
        // useBabelRc(),
        // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
        process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
        adjustWorkbox((wb) =>
            Object.assign(wb, {
                skipWaiting: true,
                exclude: (wb.exclude || []).concat('index.html'),
            }),
        ),
    ),
    // 配置devServer
    devServer: (configFunction) => (proxy, allowedHost) => {
        //代理只有开发环境可用并且不是mocker的方式,mocker启动后不使用本地代理,防止api冲突
        proxy =
            process.env.NODE_ENV === 'development' && process.env.npm_lifecycle_event !== 'mocker'
                ? PROXY
                : {};
        // allowedHost： 添加额外的地址
        const config = configFunction(proxy, allowedHost);

        //配置mocker
        if (process.env.npm_lifecycle_event === 'mocker') {
            config.before = (app) => {
                apiMocker(app, path.resolve('./src/mocker/index.js'), {
                    proxy: {
                        '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:8888', //匹配路径
                    },
                    changeHost: true,
                });
            };
        }
        return config;
    },
};
