/**
 * 
 * @method 格式化文件大小
 * @param size:{number}:文件大小
 * @param fixed:{number}{default:2}:保留小数位数
 * 
 * ****/
function formatFileSize(size:number, fixed:number = 2) {
    const unitArr:Array<string> = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    let index:number=0;
    index=Math.floor(Math.log(size)/Math.log(1024));
    const res:number =size/Math.pow(1024, index);
    return (fixed===0?Math.ceil(res):res.toFixed(fixed))+unitArr[index];
}

export default formatFileSize;