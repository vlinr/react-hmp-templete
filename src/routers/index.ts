import { RouteItemType } from '@/config/router.config';
import { cloneDeep } from 'lodash-es';
import { pathToRegexp } from 'path-to-regexp';

// 配置父级
const routerToChain = (routeList: RouteItemType[]) => {
    cloneDeep(routeList)?.forEach((item: RouteItemType) => {
        item.parent = null;
        const childMap = (data: RouteItemType, parent?: RouteItemType) => {
            if (parent) data.parent = parent;
            data?.children?.forEach?.((child: RouteItemType) => childMap(child, data));
        };
        childMap(item);
    });
    return routeList;
};

// 扁平化
const routerFlatten = (routeList: RouteItemType[]): RouteItemType[] => {
    const result: RouteItemType[] = [];
    // 使用深度优先遍历
    cloneDeep(routeList)?.forEach((item: RouteItemType) => {
        const childMap = (data: RouteItemType) => {
            result.push(data);
            data?.children?.forEach?.((child: RouteItemType) => childMap(child)); // 检查是否有下一级，有就继续
        };
        childMap(item);
    });
    return result;
};

// 更改权限
const routerFlattenAndChangeInfo = (routeList: RouteItemType[]): RouteItemType[] => {
    const result: RouteItemType[] = [];
    let layout: React.ReactNode = '';
    // 使用深度优先遍历
    cloneDeep(routeList)?.forEach((item: RouteItemType) => {
        layout = item.layout;
        item.authority = item.authority || [];
        const childMap = (data: RouteItemType) => {
            !data.layout ? (data.layout = layout) : (layout = data.layout); // 检查是否有布局，没有就使用上一次检测出来的布局
            data.authority = data.authority || [];
            result.push(data); // 扁平化处理
            data?.children?.forEach?.((child) => childMap(child)); // 检查是否有下一级，有就继续
        };
        childMap(item);
    });
    return result;
};

// 根据传入的path，找到正确的父级数组
const findPathListByPath = (routeList: RouteItemType[], path: string): RouteItemType[] => {
    const result: RouteItemType[] = [],
        cloneRoute: RouteItemType[] = routerToChain(routeList);
    let findSuccess: boolean = false;

    const loopFindParent = (route: RouteItemType): void => {
        result.unshift(route);
        if (route?.parent) loopFindParent(route.parent);
    };

    const loopRouteItem = (children: RouteItemType[], path: string) => {
        if (findSuccess) return;
        for (let i: number = 0, len: number = children.length; i < len; ++i) {
            const item: RouteItemType = children[i];
            if (!findSuccess) {
                if (pathToRegexp(item.path).test(path)) {
                    loopFindParent(item);
                    findSuccess = true;
                    break;
                } else if (item?.children?.length !== 0) {
                    loopRouteItem(item?.children || [], path);
                }
            } else {
                break;
            }
        }
    };

    loopRouteItem(cloneRoute, path);

    return result;
};

export { routerFlattenAndChangeInfo, routerFlatten, findPathListByPath, routerToChain };
