import { createModel } from '@rematch/core';
export interface StateType {
    userInfo: string | null;
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
    userInfo: null,
};
const login = createModel<any>()({
    state: initState,
    reducers: {
        setInfo(state: StateType, payload: string): StateType {
            return { ...state, userInfo: payload };
        },
    },
});

export default login;
