import { ReactElement, memo, useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { LOGIN_PATH } from '@/config/config';
import { RouteType } from '@/config/router.config';
import { USER_TOKEN_NAME } from '@/config/config';
import AsyncImport from '@/utils/asyncImport';
import serializeParams from '@/utils/serializeParams';

// 检查用户
function AuthRouter({
    component,
    layout: Layout,
    path,
    name,
    isNotLogin,
    ...rest
}: RouteType): ReactElement<RouteType> {
    const history = useHistory();

    // 路由切换全局方法
    useEffect(() => {
        const win: any = window;
        if (!win.routerChange) {
            /**
             *
             * @method 路由切换
             * @param path:路由路径
             * @param params:参数
             * @param push:是否是push
             * @param hash:是否是hash路由模式
             *
             * ****/

            // eslint-disable-next-line react-hooks/exhaustive-deps

            win.routerChange = (
                path: string,
                params: any,
                push: boolean = true,
                hash: boolean = false,
            ) => {
                if (push) {
                    if (hash) {
                        history.push(`${path}?${serializeParams(params)}`);
                    } else {
                        history.push(path, params);
                    }
                } else {
                    if (hash) {
                        history.replace(`${path}?${serializeParams(params)}`);
                    } else {
                        history.replace(path, params);
                    }
                }
            };
        }

        return () => {
            win.routerChange = null;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // 登录
    if (isNotLogin)
        // 无需登录
        return (
            <Layout>
                <Route
                    {...rest}
                    path={path}
                    render={(): JSX.Element => {
                        document.title = name;
                        const Component: any = AsyncImport(component);
                        return <Component />;
                    }}
                />
            </Layout>
        );
    if (path === LOGIN_PATH) {
        return (
            <Layout>
                <Route
                    {...rest}
                    path={path}
                    render={(): JSX.Element => {
                        document.title = name;
                        localStorage.removeItem(USER_TOKEN_NAME);
                        const Component: any = AsyncImport(component);
                        return <Component />;
                    }}
                />
            </Layout>
        );
    }
    // 正常渲染
    return (
        <Layout>
            <Route
                {...rest}
                path={path}
                render={({ location }): JSX.Element => {
                    document.title = name;
                    // 在此处校验是否登录
                    if (!localStorage.getItem(USER_TOKEN_NAME))
                        return <Redirect to={{ pathname: LOGIN_PATH, state: location }} />;
                    const Component: any = AsyncImport(component);
                    return <Component />;
                }}
            />
        </Layout>
    );
}

export default memo(AuthRouter);
