import { RouteItemType } from '@/config/router.config';
import { cloneDeep } from 'lodash-es';
import formatPath from './formatPath';
let findSuccess:boolean = false;
const routerFlatten = (routeList: Array<RouteItemType>): Array<any> => {
    let result: Array<RouteItemType> = [];  //这里定义为Array<RouteItemType>，默认会把/得path更换掉
    //使用深度优先遍历
    cloneDeep(routeList)?.map((item: RouteItemType) => {
        const childMap = (data: RouteItemType) => {
            result.push(data);//扁平化处理  
            data?.children?.map?.((child: RouteItemType) => childMap(child)); //检查是否有下一级，有就继续
        }
        item.parent = true;
        childMap(item);
    })
    return result;
}

const routerFlattenAndChangeInfo = (routeList: Array<RouteItemType>) => {
    let result: Array<RouteItemType> = []
        , layout: React.ReactNode = '';
    //使用深度优先遍历
    cloneDeep(routeList)?.map((item: RouteItemType) => {
        layout = item.layout;
        item.authority = item.authority || [];
        const childMap = (data: RouteItemType) => {
            !data.layout ? data.layout = layout : layout = data.layout; //检查是否有布局，没有就使用上一次检测出来的布局
            data.authority = data.authority || [];
            result.push(data);//扁平化处理
            data?.children?.map?.(child => childMap(child)); //检查是否有下一级，有就继续
        }
        childMap(item);
    })
    return result;
}



//根据传入的path，找到正确的path数组
const findPathListByPath = (routeList: Array<RouteItemType>, path: string) => {
    let result: Array<RouteItemType> = [];
    let cloneRoute: Array<RouteItemType> = cloneDeep(routeList);
    let formatStr:string = formatPath(path);
    findSuccess = false;
    for (let i: number = 0, len: number = cloneRoute.length; i < len; ++i) {
        if(findSuccess)break;
        result = [];
        let item: RouteItemType = cloneRoute[i];
        if (item.path === formatStr) {
            result.push(item);
            findSuccess = true;
            break;
        } else if (item?.children !== undefined && item?.children?.length !== 0 && !findSuccess) {
            result.push(item);
            result=loopRouteItem(result, item.children, formatStr);
        }
    }
    return result;
}

function loopRouteItem(result: Array<RouteItemType>, children: Array<RouteItemType>, path: string): Array<RouteItemType> {
    for (let i: number = 0, len: number = children.length; i < len; ++i) {
        let item: RouteItemType = children[i];
        if (item.path === path) {
            result.push(item);
            findSuccess = true;
            break;
        } else if (item?.children !== undefined && item?.children?.length !== 0) {
            result.push(item);
            loopRouteItem(result, item.children, path);
        }
    }
    return result;
}

export {
    routerFlattenAndChangeInfo,
    routerFlatten,
    findPathListByPath
}