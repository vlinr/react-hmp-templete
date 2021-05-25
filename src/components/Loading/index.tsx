import * as React from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';
const { memo } = React;
interface LoadingType {
    error?: any, //加载错误
    pastDelay:boolean 
    mask?:boolean,
    isFullScreen?:boolean
}
//登录
const Loding = ({ error,pastDelay,mask ,isFullScreen}: LoadingType): React.ReactElement | null => {
    if (error) return <div>加载错误</div>
    if (pastDelay)
        return <div style={{ textAlign: 'center' }} className={`${isFullScreen && styles.fullscreen} ${mask && styles.mask}`}>
            <Spin />
        </div>
    return null;
}

export default memo(Loding);