//布局文件
import UserLayout from '@/layouts/UserLayout';
import { FormOutlined } from '@ant-design/icons';

/******
 * 
 * 全局路由配置文件
 * 
 * ****/

export interface RouteType {
    path: string,
    name: string,
    component?: string,
    layout?: React.ReactNode | any,
    exact?: boolean,
    isNotLogin?:boolean
}

export interface RouteItemType extends RouteType {
    children?: Array<RouteItemType>,
    newWindow?: boolean,
    authority?: Array<string>,
    hideItem?: boolean,
    icon?: React.ReactNode | any
    [moreName: string]: any  //更多参数
}

//配置路由
const ROUTER_CONFIG: Array<RouteItemType> = [
    {
        path: '/',  //访问路径
        layout: UserLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        name: '测试模板', //名称
        icon: FormOutlined,
        component:'Index', //和pages下面的目录名称保持一致
        newWindow: false,  //是否是新窗口打开
        authority: [],//权限拥有者
        isNotLogin:true,
        children: [
            
        ]
    },
    {
        path: '/404',  //访问路径
        layout: UserLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        name: '404', //名称
        icon: FormOutlined,
        component:'NotFound',
        newWindow: false,  //是否是新窗口打开
        authority: [],//权限拥有者
        isNotLogin:true,
        children: [
           

        ]
    },
]

export default ROUTER_CONFIG;