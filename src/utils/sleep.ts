 /****
  * 
  * @method 睡眠指定时间
  * @param time:{number}:睡眠时间，毫秒
  * 
  * ****/
 const sleep = (time:number = 2000):Promise<string>=>{
    return new Promise((resolve:(value:string)=>void)=>{
        setTimeout(() => {
            resolve('');
        }, time);
    })
}
export default sleep;