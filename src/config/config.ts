/******
 * 
 * 全局通用配置文件
 * 
 * ****/
export const LOGIN_PATH:string = '/login'; //登录的路径

export const USER_AUTHORITY: string = 'admin'; //用户角色,在authority数组去寻找是否有这个角色，有则显示，没有则不渲染

export const USER_TOKEN_NAME:string = 'USER_TOKEN';  //TOKEN字段

export const REQUEST_SUCCESS:number = 200;  //请求成功的标识

export const VIEW_TO_REM_INFO:{
    maxWidth:number,  //最大宽度,超过这个宽度后，就会以这个宽度去计算根元素的像素值，比如 750，那么在750的尺寸下，1rem = {fontSize}px
    designWidth:number, //设计尺寸，单倍,设计尺寸比如是 375,屏幕实际宽度是 750，那么计算出的fontSize就是 750 / 375 * fontSize
    fontSize:number,  //基准的字体大小,如果使用postcss-px2rem，需要和postcss-px2rem处的基准字体设置成一样的大小
} = {
    maxWidth:750,
    designWidth:375,
    fontSize:14
}