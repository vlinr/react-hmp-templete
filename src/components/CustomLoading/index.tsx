import * as React from 'react';
import styles from './index.module.less';
const { memo } = React;
interface LoadingType {
    loading: boolean,
    showText?: boolean,
    color?: string,
    text?: string | number
}
//登录
const CustomLoading = ({ loading, showText, text, color = '#fff' }: LoadingType): React.ReactElement | null => {

    if (loading) {

        return <div className={styles.loading}>
            <div className={styles.l_icon}>
                <span style={{ background: color }}></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {showText && <div className={styles.l_txt} style={{ color: color }}>{text}</div>}
        </div>
    }

    return null;
}

export default memo(CustomLoading);