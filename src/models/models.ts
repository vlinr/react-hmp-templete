import { Models } from '@rematch/core';
import locale from './locale';
import index from './index';
import login from './login';

export interface RootModel extends Models<{ [key: string]: any }> {
    locale: typeof locale;
    index: typeof index;
    login: typeof login;
}

export const models: RootModel = {
    locale,
    index,
    login,
};
