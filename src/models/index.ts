import { createModel } from '@rematch/core';
import Request from '@/request/Request';
import {
    API,SERVER_TYPE_API
} from '@/config/api.config';
import {message} from 'antd';
import { REQUEST_SUCCESS } from '@/config/config';
export interface StateType {
    info: string | null,
}
export interface IAction{
    token:string | null,
    callback?:Function
}
export interface SelectResultAction extends IAction{
    mobile:string | number,
    name:string | number
}
//初始的一个state
const initState:StateType = {
    info:null
}
export const index = createModel<any>()({
    state: initState, //初始的state
    reducers: {
        setInfo(state:StateType, payload: string):StateType {
            return { ...state, info:payload }
        }
    },
    effects: dispatch => ({
        //获取奖品列表
        async getInfo(payload: IAction) {
            this.setInfo('这里的精彩，由你来实现===>你已停留：');
            new Request({
                api: SERVER_TYPE_API + API,
                method: 'GET',
                data: {
                    token:payload.token
                }
            },(response:any)=>{
                if (response.code === REQUEST_SUCCESS) {
                    this.setInfo(response.data);
                }else{
                    message.error(response.tipmsg)
                }
                payload?.callback?.(response);
            });
        }
    })
});