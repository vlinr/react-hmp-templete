import { Models } from '@rematch/core';
import locale from './locale';
import index from './index';

export interface RootModel extends Models {
    locale:typeof locale,
    index:typeof index
}

export const models: RootModel = { 
    locale,
    index,
}