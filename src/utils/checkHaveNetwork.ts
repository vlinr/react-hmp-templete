interface NetworkType{
    onLine:boolean, //是否在线
    downlink:number //下载速度
}

/*****
 * 
 * @method 检查是否有网络
 * 
 * @returns NetworkType
 * 
 * ****/
function checkHaveNetwork():NetworkType{
    return {
        onLine:window.navigator.onLine,
        downlink:(window as any).navigator?.connection?.downlink || 0
    }
}


/*****
 * 
 * @function 下载速度
 * 
 * @params fn:{Function}：下载速度回调
 * 
 * *****/
function downloadSpeed(fn:(speed:number)=>void){
    // let startTime:number, endTime:number, fileSize:number;
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = () => {
    //     if(xhr.readyState === 2){
    //         startTime = Date.now();
    //     }
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         endTime = Date.now();
    //         fileSize = xhr.responseText.length;
    //         console.log(fileSize);
    //         var speed = fileSize  / ((endTime - startTime)/1000) / 1024;
    //         fn(Math.floor(speed));
    //     }
    // }
    // xhr.open("GET", "https://hly-edu.oss-cn-chengdu.aliyuncs.com/hly/dist.zip?id=" + Math.random(), true);
    // xhr.send();
}

export default checkHaveNetwork;