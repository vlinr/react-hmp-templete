
/// <reference types="react-scripts" />

//解决模块化引入less报错问题
// declare module "*.less" {
//     const less: any;
//     export default less;
// }

declare module "*.module.less" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "@rematch/updated" {
    const updatedPlugin:any;
    export default updatedPlugin;
}


declare module '@/*';

// declare interface StoreType {
//     seo: any,
//     aboutContact:any,
//     list: any,
//     pagination: PaginationType | null,
//     userInfo: any,
//     currentItem:any
// }

declare module 'react-loadable' {
    const Loadable: any;
    export default Loadable;
}

//引入不存在的这个模块
// declare module 'braft-extensions/dist/color-picker' {
//     const ColorPicker: any;
//     export default ColorPicker;
// }
// declare module 'braft-finder';
// declare module 'braft-utils';
// declare module 'braft-extensions/dist/table';
// declare module 'braft-extensions/dist/header-id';
// declare module 'braft-extensions/dist/code-highlighter';
// declare module 'braft-extensions/dist/markdown';
