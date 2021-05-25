/*****
 * 
 * @method 格式日期
 * @param value:{number}:日期值
 * @param symbol:{string}:连接符号
 * @param hideZero:{boolean}:是否隐藏0
 * 
 * ****/
export default function formatTimeToHHMMSS(value:number,symbol:string = '',hideZero:boolean = true){
        var h = Math.floor(value / 3600) < 10 ? '0' + Math.floor(value / 3600) : Math.floor(value / 3600);
        var m = Math.floor((value / 60 % 60)) < 10 ? '0' + Math.floor((value / 60 % 60)) : Math.floor((value / 60 % 60));
        var s = Math.floor((value % 60)) < 10 ? '0' + Math.floor((value % 60)) : Math.floor((value % 60));
        return symbol ? `${hideZero ? (h !== '00' ? h + symbol : ''):h + symbol}${hideZero ? (m !== '00' ? m + symbol : ''):m + symbol}${symbol}${s}` : `${hideZero?(h !== '00' ? h + '时' : ''):h + symbol}${hideZero?(m !== '00' ? m + '分' : ''):m+ symbol}${s}秒`;
}