/**
 * ***
 *
 * @format
 * @method 睡眠指定时间
 * @param time:{number}:睡眠时间，毫秒
 */

import { ResolveType } from '@/typing';
const sleep = (time: number = 2000): Promise<string> => {
    return new Promise((resolve: typeof ResolveType) => {
        setTimeout(() => {
            resolve('');
        }, time);
    });
};
export default sleep;
