import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
// 路由配置文件
import ROUTER_CONFIG, { RouteItemType } from '../config/router.config';
import React from 'react';
// 重写路由，对布局进行更改
import AuthRouter from './router';
import { USER_AUTHORITY } from '../config/config';
import { routerFlattenAndChangeInfo } from '.';

import { homepage } from '../../package.json';

const getBasePath = (hp: string) => {
    if (hp === '.') return '/';
    return hp;
};

const FLATTEN_ROUTER: Array<RouteItemType> = routerFlattenAndChangeInfo(ROUTER_CONFIG),
    redirectRouter: Array<RouteItemType> = [];
let transitionArr: Array<RouteItemType> = [];
for (let i: number = 0, len: number = FLATTEN_ROUTER.length; i < len; ++i) {
    const item: RouteItemType = FLATTEN_ROUTER[i];
    if (!item.component) {
        // 没有组件，就需要重定向
        transitionArr.push(item);
    } else {
        transitionArr?.forEach((child: RouteItemType) => {
            child.redirectUrl = item.path; // 重定向地址
            redirectRouter.push(child);
        });
        transitionArr = [];
    }
}

export default (
    <Router basename={getBasePath(homepage)}>
        <Switch>
            {redirectRouter?.map((item: RouteItemType) => (
                <Route
                    path={item.path}
                    key={item.path}
                    exact
                    render={() => <Redirect to={item.redirectUrl} />}
                />
            ))}
            {FLATTEN_ROUTER?.map((item: RouteItemType) => {
                return (
                    item.component &&
                    ((item?.authority || [])?.indexOf(USER_AUTHORITY) > -1 ||
                        (item?.authority || [])?.length === 0) && (
                        <AuthRouter
                            exact
                            key={item.path}
                            name={item?.name}
                            path={item.path}
                            isNotLogin={item.isNotLogin}
                            component={item.component}
                            layout={item.layout}
                        />
                    )
                );
            })}
            <Redirect to='/404' />
        </Switch>
    </Router>
);
