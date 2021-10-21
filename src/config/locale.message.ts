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
    name:'大家好，我叫：{name}'
}

/***
 * 
 * 英语的配置
 * 
 * ***/
const enUS:MessageType={
    name:'Hello，My name is：{name}'
}

export {
    zhCN,enUS
};
