import { useState, useCallback, memo, useRef, ReactElement, createElement } from 'react';
import styles from './blankLayout.module.less';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
    LogoutOutlined,
    DownOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { RouteItemType } from '@/config/router.config';
import CustomMenu from './CustomMenu';
import { USER_TOKEN_NAME } from '@/config/config';
import useLocale from '@/hooks/useLocale';
import { useStore } from '@/hooks/useRedux';

const { Header, Content, Footer } = Layout;

const TOP_INFO: ReactElement = (
    <Menu>
        <Menu.Item
            icon={<LogoutOutlined />}
            onClick={() => {
                localStorage.removeItem(USER_TOKEN_NAME);
                window.location.reload();
            }}>
            {useLocale('退出登录')}
        </Menu.Item>
    </Menu>
);

interface MenuCurrentType {
    toggle?: Function;
}

function BlankLayout(props: RouteItemType): ReactElement<RouteItemType> {
    const { children } = props; // 获得子元素，渲染到对应的地方即可

    const userInfo = useStore('login/userInfo'); // 用户信息

    const [collapsed, setCollapsed] = useState(false);
    const menuRef = useRef<MenuCurrentType | undefined>(undefined);
    const setParentCollapsed: Function = useCallback((value: boolean) => {
        setCollapsed(value);
    }, []);
    // 调用子元素得方法
    const toggle = useCallback(() => {
        menuRef?.current?.toggle?.();
    }, [menuRef]);
    return (
        <div className={styles.layout}>
            <Layout style={{ minHeight: '100vh' }}>
                <CustomMenu
                    ref={menuRef}
                    collapsed={collapsed}
                    setParentCollapsed={setParentCollapsed}
                />
                <Layout className={styles.subLayout}>
                    <Header className={styles.header} style={{ padding: 0 }}>
                        {/* {
                            collapsed?<MenuUnfoldOutlined onClick={toggle} />:<MenuFoldOutlined  onClick={toggle}/>
                        } */}
                        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            onClick: toggle,
                        })}
                        <div className={styles.userInfo}>
                            <Dropdown overlay={TOP_INFO} placement='bottomCenter' arrow>
                                <div className={styles.box}>
                                    <Avatar
                                        icon={<UserOutlined />}
                                        src={userInfo?.headUrl || <UserOutlined />}
                                    />
                                    <b>{userInfo?.name}</b>
                                    <DownOutlined
                                        style={{
                                            fontSize: 15,
                                            marginLeft: 5,
                                            position: 'relative',
                                            top: 2,
                                        }}
                                    />
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        className={styles.content}
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}>
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2022 版权所有</Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default memo(BlankLayout);
