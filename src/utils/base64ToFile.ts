
/****
 * 
 * @method 将base64数据转为文件类型
 * @param base64:{string}：base64数据
 * @returns Blob
 * ***/
function base64ToFile(base64:string):Blob{
    let arr:Array<any> = base64.split(','),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        l = bstr.length,
        u8Arr = new Uint8Array(l);
        
    while (l--) {
        u8Arr[l] = bstr.charCodeAt(l);
    }
    return new Blob([u8Arr], {
        type: fileType
    });
}

export default base64ToFile;