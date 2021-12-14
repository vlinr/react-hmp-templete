import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';
import { composeWithDevTools } from 'redux-devtools-extension';
// import createLoadingPlugin from '@rematch/loading';
import updatedPlugin from '@rematch/updated';
const updated = updatedPlugin();
// const loading = createLoadingPlugin({ asNumber:false });
export const store = init({
    models,
    plugins: [updated],
    redux: {
        devtoolOptions: composeWithDevTools,
    },
});
// 导出类型
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
