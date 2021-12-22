import { createModel } from '@rematch/core';
import { message } from 'antd';
import { REQUEST_SUCCESS } from '@/config/config';
import { testServer } from '@/service';
export interface StateType {
    info: string | null;
}
export interface IAction {
    token: string | null;
    callback?: (params: any) => void;
}
export interface SelectResultAction extends IAction {
    mobile: string | number;
    name: string | number;
}
// 初始的一个state
const initState: StateType = {
    info: null,
};
const index = createModel<any>()({
    state: initState,
    reducers: {
        setInfo(state: StateType, payload: string): StateType {
            return { ...state, info: payload };
        },
    },
    effects: () => ({
        // 获取奖品列表
        async getInfo(payload: IAction) {
            this.setInfo('Redux_Tips');
            const response = await testServer();
            if (response.code === REQUEST_SUCCESS) {
                this.setInfo(response.data);
                response.toJSON();
            } else {
                message.error(response.tipmsg);
            }
            payload?.callback?.(response);
        },
    }),
});

export default index;
