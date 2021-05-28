import { Models } from '@rematch/core';
import index from './index';

export interface RootModel extends Models {
    index:typeof index
}

export const models: RootModel = { 
    index
}