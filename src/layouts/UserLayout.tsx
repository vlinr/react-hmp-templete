import * as React from 'react';

interface PropsType {
    children:React.ReactNode | string | React.ReactElement
}

function UserLayout(props: PropsType):React.ReactElement {
    const { children } = props;
    return (
        <>
         {children}
        </>
    );
}

export default UserLayout;