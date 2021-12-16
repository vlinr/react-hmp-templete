import { memo, ReactElement } from 'react';
import styles from './index.module.less';
type LoadingType = {
    loading: boolean;
    showText?: boolean;
    color?: string;
    text?: string | number;
};

// 登录
const RotateLoading = ({
    loading,
    showText,
    text,
    color = '#fff',
}: LoadingType): ReactElement | null => {
    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.l_icon}>
                    <span style={{ background: color }}></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {showText && (
                    <div className={styles.l_txt} style={{ color: color }}>
                        {text}
                    </div>
                )}
            </div>
        );
    }
    return null;
};

export default memo(RotateLoading);
