

import {routerFlatten} from '@/utils/routerToFlatten';
import ROUTER_CONFIG, { RouteItemType } from '@/config/router.config';

interface FilesType{
    [name:string]:()=>any
}
const FlattenRouters:Array<RouteItemType> = routerFlatten(ROUTER_CONFIG);

const Files:FilesType ={
    
}

FlattenRouters.forEach((item:RouteItemType)=>{
    Files[item.component as string] = ()=>import(`@/pages/${item.component}`) 
});

export default Files