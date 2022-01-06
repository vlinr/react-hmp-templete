import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';
import { composeWithDevTools } from 'redux-devtools-extension';
import updatedPlugin from '@rematch/updated';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';

type FullModel = ExtraModelsFromLoading<RootModel>;

export const store = init<RootModel, FullModel>({
    models,
    plugins: [loadingPlugin({ type: 'boolean' }), updatedPlugin()],
    redux: {
        devtoolOptions: composeWithDevTools,
    },
});
// 导出类型
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
