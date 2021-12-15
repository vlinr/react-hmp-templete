## 项目说明

采用react-app-rewired配合customize-cra搭建的一套前端开发框架，额外扩充了自定义配置，包括api扩展，路由配置，国际化配置等，集成husky，eslint，stylelint等代码风格校验，方便开发者轻松上手使用。

## 技术栈

react17.0.2<br />
react-dom17.0.2<br />
react-app-rewired2.1.8<br />
redux4.1.2<br />
react-redux7.2.6<br />
react-router-dom5.3.0<br />
less4.1.2<br />
antd4.17.3<br />
lodash-es4.17.21<br />
reselect4.1.5<br />
bizcharts4.1.15<br />
fetch<br />
typescript...

## 目录结构

> > > > --| public ---- 存放一些无需打包的公共文件<br />
> > > > --| plugins ---- 存放自定义 webpack 插件目录<br />
> > > > --| src<br />
> > > >
> > > > > --| components ---- 全局通用组件存放位置<br />
> > > > > --| config ---- 通用配置文件存放位置，包含路由配置，请求api配置，请求header配置等<br />
> > > > > --| hooks ---- 存放全局hooks<br />
> > > > > --| importFile ---- 自动异步导入文件<br />
> > > > > --| layouts ---- 布局文件夹<br />
> > > > > --| less ---- 全局公共less<br />
> > > > > --| locale ---- 国际化配置<br />
> > > > > --| mocker ---- 模拟api配置<br />
> > > > > --| models ---- redux存放<br />
> > > > > --| pages ---- 具体每一个页面<br />
> > > > > --| request ---- 请求类存放地址,无需过多的更改<br />
> > > > > --| routers ---- 路由自定义渲染,无需过多的更改<br />
> > > > > --| service ---- 请求 api 配置目录<br />
> > > > > --| typing ---- 全局类型存放位置，不会被eslint进行检测<br />
> > > > > --| utils ---- 公共函数存放目录<br />

### `yarn` | `npm install`

安装依赖包

### `yarn start` | `npm run start`

启动项目,开发环境启动

### `yarn mocker` | `npm run mocker`

Mock 方式启动,启动后将使用本地 src 下面的 mocker 文件夹下的 api

### `yarn test`

测试

### `yarn build` | `npm run build`

打包项目

### `yarn global add electron | npm install -g electron & electron .`

全局安装 electron,安装完成后,使用 `electron . `启动桌面环境开发,当然必须先启动项目后,在进行启动桌面环境

### `yarn eject`

**慎用，暴露出相关配置文件，但不可逆。**
