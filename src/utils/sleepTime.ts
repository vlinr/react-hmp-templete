 /****
  * 
  * @method 睡眠指定时间
  * @param time:{number}:睡眠时间，毫秒
  * 
  * ****/
 const sleepTimer = function(time:number = 2000):Promise<any>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(1);
        }, time);
    })
}
export default sleepTimer;