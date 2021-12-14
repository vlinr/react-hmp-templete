/** **
 * 
 * @method 获取指定范围的随机整数
 * @param min:{number}:最小值
 * @param max:{number}:最大值
 * 
 * ******/
function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export default getRandom;