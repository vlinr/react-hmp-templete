
/*****
 * 
 * @method 根据传进来的成功状态返回所有非成功的状态
 * @param promiseList:{Promise<any> | any}：promise列表
 * @param key:{string}:对应返回中的哪个key
 * @param value:{string|number}:返回的code值
 * @param loseAll:{boolean = false}:是否是返回全部
 * *****/
 const promiseLoseAll = async function(promiseList:Array<Promise<any> | any>,key:string,value:string|number,loseAll:boolean = false):Promise<Array<{[key:string]:any}>>{
    let result:Array<any> = [];
    for(let i:number=0;i<promiseList.length;++i){
        let res:any = await promiseList[i];
        if(typeof res === 'object' && res !== null && !Array.isArray(res)){
            res.index = i;
        }
        if(res?.[key] !== value){
            result.push(res);
            if(loseAll){
                break;
            }
        }
    }
    return result;
}

export default promiseLoseAll;