/***
 * 
 * 国际化配置
 * 
 * **/

type MessageType = {
    [key:string]:string
}


/****
 * 
 * 中文配置
 * 
 * **/
const zhCN:MessageType={
    name:'哈哈哈{name}'
}

/***
 * 
 * 英语的配置
 * 
 * ***/
const enUS:MessageType={
    name:'hahah{name}'
}

export {
    zhCN
};
export {
    enUS
};