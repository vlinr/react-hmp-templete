import { createModel } from '@rematch/core';
import { DEFAULT_LANGUAGE } from '@/config/config';
export type LangType = {
    language:string
}

export interface IAction{
    type:string
}
export interface SelectResultAction extends IAction{
    mobile:string | number,
    name:string | number
}
/***
 * 
 * 各个语言的默认选中值
 * 
 * **/
const initState:LangType = {
    language:DEFAULT_LANGUAGE
}
const locale = createModel<any>()({
    state: initState, //初始的state
    reducers: {
        setLocale(state:LangType, payload: string):LangType {
            return {...state,language:payload};
        }
    }
});

export default locale;