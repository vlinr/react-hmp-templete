

import {routerFlatten} from '@/utils/routerToFlatten';
import ROUTER_CONFIG, { RouteItemType } from '@/config/router.config';
//处理import()无法传入变量的问题，单个导入文件，直接在外部使用
/**
 * 将路由对应的组件在此处进行导入
 * **/
interface FilesType{
    [name:string]:()=>any
}
const FlattenRouters:Array<RouteItemType> = routerFlatten(ROUTER_CONFIG);

const Files:FilesType ={
    
}
FlattenRouters.map((item:RouteItemType)=>{
    Files[item.component as string] = ()=>import(`@/pages/${item.component}`) 
});

export default Files