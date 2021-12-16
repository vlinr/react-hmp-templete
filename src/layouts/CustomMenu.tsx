import { useCallback, useEffect, memo, useState, forwardRef, ReactElement } from 'react';
import styles from './customMenu.module.less';
import { Link, useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';
import { Layout, Menu } from 'antd';
import ROUTER_CONFIG, { RouteItemType } from '@/config/router.config';
import { routerFlatten } from '@/utils/routerToFlatten';
import formatPath from '@/utils/formatPath';
const { Sider } = Layout;

const USER_AUTHORITY = 'admin'; // 用户角色,在authority数组去寻找是否有这个角色，有则显示，没有则不渲染

// 根据深度优先推算出导航得层级
const findRouter = (findList: Array<RouteItemType>, path: string): Array<string> => {
    const result: Array<string> = [];
    let end: number = -1,
        start = -1;
    for (let i: number = 0, len = findList.length; i < len; ++i) {
        const item: RouteItemType = findList[i];
        if (item.parent) start = i;
        if (item.path === path) {
            end = i;
            break;
        }
    }
    if (start !== -1 && end !== -1)
        for (let i: number = start; i <= end; ++i) {
            const item: RouteItemType = findList[i];
            result.push(item.path);
        }
    return result;
};

type PrevInfoType = {
    key?: string;
    keyPath?: Array<string>;
};

const PREV_INFO: PrevInfoType = {
    key: '',
    keyPath: [],
};

// 更改权限
function routerChangeAuthority(routerList: Array<RouteItemType>) {
    const ROUTER_LIST: Array<RouteItemType> = cloneDeep(routerList);
    // 使用深度优先遍历
    ROUTER_LIST?.map((item: RouteItemType) => {
        item.authority = item.authority || [];
        const childMap: Function = (data: RouteItemType) => {
            data.authority = data.authority || [];
            data?.children?.map((child) => childMap(child)); // 检查是否有下一级，有就继续
        };
        childMap(item);
    });
    return ROUTER_LIST;
}
// 所有父级的keys
const ROOT_KEYS: Array<string> = [];

interface MenuPropsType {
    collapsed: boolean;
    setParentCollapsed: Function;
    [propsName: string]: any;
}

const DEFAULT_OPEN_KEYS: string | null = localStorage.getItem('UP_SELECT_RE');
let prevOpenKeys: Array<string> = [];
// 设置选中的元素
const setSelectItem = (item: any): void => {
    prevOpenKeys = [];
    item?.keyPath?.map((pathItem: string) => {
        if (pathItem !== item.key) prevOpenKeys.push(pathItem);
    });
    PREV_INFO.key = item.key;
    PREV_INFO.keyPath = item.keyPath;
    localStorage.setItem('UP_SELECT_RE', JSON.stringify(PREV_INFO));
};

// 用户刷新当前浏览器，设置默认选中
DEFAULT_OPEN_KEYS && setSelectItem(JSON.parse(DEFAULT_OPEN_KEYS));

let FLATTEN_ROUTER: Array<RouteItemType> | null = null;

const CustomMenu = forwardRef(
    ({ collapsed, setParentCollapsed }: MenuPropsType, ref: any): ReactElement<MenuPropsType> => {
        const history = useHistory();

        // 子元素设置父元素选中得key
        const setOpenKeys: Function = useCallback((openKeys: Array<string>) => {
            setOpenItemKeys(openKeys);
        }, []);
        // 选中得key
        const [openItemKeys, setOpenItemKeys] = useState(prevOpenKeys);
        // 切换，控制菜单栏显示全部和摘要
        const toggle = useCallback(() => {
            setParentCollapsed(!collapsed);
            if (collapsed) {
                const historyPath: string = formatPath(history.location.pathname); // 去掉最后得斜杠
                FLATTEN_ROUTER && setOpenKeys(findRouter(FLATTEN_ROUTER, historyPath));
            } else {
                // 收起来得时候，关掉，否则会闪烁
                setOpenKeys([]);
            }
        }, [collapsed, setParentCollapsed, history, setOpenKeys]);
        // 使用forwardRef，接收ref，第二个参数，函数组件默认不允许直接使用ref，因此外部传递过来，在内部进行赋值
        // ref.current = form
        ref.current = {};
        ref.current.toggle = toggle; // 把这个函数暴露出去

        // ROOT_KEYS变化得时候执行
        useEffect(() => {
            if (!FLATTEN_ROUTER) FLATTEN_ROUTER = routerFlatten(ROUTER_CONFIG);
            const historyPath: string = formatPath(history.location.pathname);
            setOpenKeys(findRouter(FLATTEN_ROUTER, historyPath));
        }, [setOpenKeys, history]);

        // 设置打开的列表
        const onOpenChange: any = useCallback(
            (openKeys: Array<string>) => {
                // 默认开启下一个，自动关闭上一个
                const latestOpenKey: string | undefined = openKeys.find(
                    (key: string) => openItemKeys.indexOf(key) === -1,
                );
                if (ROOT_KEYS.indexOf(`${latestOpenKey}`) === -1) {
                    // 如果最后一次的key，没有在openkeys里面
                    setOpenKeys(openKeys);
                } else {
                    latestOpenKey ? setOpenKeys([latestOpenKey]) : setOpenKeys([]);
                }
            },
            [openItemKeys, setOpenKeys],
        );

        // 元素点击的时候,为了赋值默认值，否则会闪一闪得
        const itemClickHandle = useCallback((item: any) => {
            setSelectItem(item);
        }, []);
        const subMenuClick = useCallback(
            (key: string, hasComponent: boolean) => hasComponent && history.push(key),
            [history],
        );

        // 渲染菜单栏
        const childMap: Function = useCallback(
            (data: RouteItemType) => {
                if (
                    !data?.hideItem &&
                    ((data?.authority || [])?.indexOf(USER_AUTHORITY) > -1 ||
                        (data?.authority || []).length === 0)
                ) {
                    const Icon: any = data?.icon || null;
                    if ((data?.children || [])?.length !== 0) {
                        return (
                            <Menu.SubMenu
                                key={`${data.path}`}
                                onTitleClick={({ key }) =>
                                    subMenuClick(key, data.component ? true : false)
                                }
                                title={data.name}
                                icon={Icon ? <Icon /> : null}>
                                {data?.children?.map((child: RouteItemType) => childMap(child))}
                            </Menu.SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={`${data.path}`} icon={Icon ? <Icon /> : null}>
                                <Link to={`${data.path}`} target={data.isNewWindow ? '_blank' : ''}>
                                    {data.name}
                                </Link>
                                {(data?.children || [])?.map((child: RouteItemType) =>
                                    childMap(child),
                                )}
                            </Menu.Item>
                        );
                    }
                }
                return null;
            },
            [subMenuClick],
        );

        // 如果涉及到数据变化，无法使用useCallback，使用后设置openKeys无效
        const routerToJSX: Function = (routeList: Array<RouteItemType>) => {
            return (
                <Menu
                    theme='dark'
                    mode='inline'
                    onOpenChange={onOpenChange}
                    onClick={itemClickHandle}
                    openKeys={openItemKeys}
                    selectedKeys={[formatPath(history.location.pathname)]}>
                    {routerChangeAuthority(routeList)?.map(
                        (item: RouteItemType): React.ReactNode => {
                            (item.children || [])?.length !== 0 &&
                                ROOT_KEYS.indexOf(item.path) === -1 &&
                                ROOT_KEYS.push(item.path);
                            return childMap(item);
                        },
                    )}
                </Menu>
            );
        };
        return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo}>LOGO</div>
                {routerToJSX(ROUTER_CONFIG)}
            </Sider>
        );
    },
);

export default memo(CustomMenu);
