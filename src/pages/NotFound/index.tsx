import { memo, ReactElement } from 'react';
/**
 *
 * @function:404
 *
 * *******/
function NotFound(): ReactElement<any> {
    return (
        <div
            style={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                fontSize: 24,
            }}>
            404
        </div>
    );
}

export default memo(NotFound);
