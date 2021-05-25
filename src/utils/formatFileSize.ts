function formatFileSize(size:number,fixed:number = 2){
    const unitArr:Array<string> = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB");
    let index:number=0;
    index=Math.floor(Math.log(size)/Math.log(1024));
    let res:number =size/Math.pow(1024,index);
    return (fixed===0?Math.ceil(res):res.toFixed(fixed))+unitArr[index];
}

export default formatFileSize;