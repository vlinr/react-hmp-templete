import React, { memo } from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';
import useLocale from '@/hooks/useLocale';
type LoadingType = {
    error?: any; // 加载错误
    pastDelay: boolean;
    mask?: boolean;
    isFullScreen?: boolean;
};

const SpinLoading = ({
    error,
    pastDelay,
    mask,
    isFullScreen,
}: LoadingType): React.ReactElement | null => {
    if (error) return <div>{useLocale('Loading_Error')}</div>;
    return (
        (pastDelay && (
            <div
                className={`${isFullScreen && styles.fullscreen} ${mask && styles.mask}`}
                style={{ textAlign: 'center' }}>
                <Spin />
            </div>
        )) ||
        null
    );
};

export default memo(SpinLoading);
