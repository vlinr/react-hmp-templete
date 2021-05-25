 const sleepTimer = function(time:number = 2000):Promise<any>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(1);
        }, time);
    })
}
export default sleepTimer;