/****
 * 
 * @method 格式化日期
 * @param time:{string | number}:需要转化的日期，可以是一个日期也可以是一个时间戳也可以是秒，但是如果是日期，则以字符串传入，并且会
 *                              默认把字符串当成日期格式，如果是数字会当成时间戳或者秒
 * @param format:{string}:需要转化的格式：YYYYMMDD HHmmss w  年月日 时分秒 周  ===>除了MM 和 mm区分大小写，其余的均不区分大小写 周默认会转为 大写
 * @param seconds:{boolean}:是否使用秒
 * @param hideZero:{boolean}：是否隐藏自动补0
 * 
 * 
 * @returns string
 * 
 * *****/

function formatDate(time:string | number,format:string,seconds:boolean = false,hideZero:boolean = false):string {
    if (/(M+)/.test(format)) {
        format = replaceStringByKey(format,'M','f');
    }
    format = format.toLocaleLowerCase();
    const RULES:{
        [key:string]:number
    } = getRules(time,seconds);
      for (let key in RULES) {
        while(RegExp(`(${key})`).test(format)){
            let str:string = RULES[key].toString();
            if(key === 'w+'){
                const WEEKS:Array<string> = ['日','一','二','三','四','五','六']
                format = format.replace(RegExp.$1, WEEKS[+str]);
            }else{
                format = format.replace(RegExp.$1, (str.length >= 2 || hideZero)?str:fillZero(str));
            }
        }
      }
      return format;
}

/****
 * 
 * @method 获取转换规则
 * @param seconds:{boolean}:是否使用秒
 * 
 * *****/
function getRules(time:number|string,seconds:boolean):{[key:string]:number}{
    if(seconds){
        return {
            'd+': formatDateBySeconds(time,'d'), //日
            'h+': formatDateBySeconds(time,'h'), //时
            'm+': formatDateBySeconds(time,'m'), //分
            's+': formatDateBySeconds(time,'s') //秒
          };
    }else{
        const date:Date = getDate(time);
        return {
            'y+': getYear(date), //年
            'f+': getMonth(date) + 1, //月
            'd+': getDay(date), //日
            'h+': getHours(date), //时
            'm+': getMinutes(date), //分
            's+': getSeconds(date), //秒
            'w+': getWeekDay(date)  //星期
          }
    }
}

/******
 * 
 * @method 传入的是秒，则普通解析
 * 
 * @param time:{number|string}:秒
 * 
 * *****/
function formatDateBySeconds(time:number | string,key:string):number{
    let result:number = 0;
    switch(key){
        case 'h':
            result = Math.floor(+time / 3600 % 24);
        break;
        case 'm':
            result = Math.floor((+time / 60 % 60));
        break;
        case 's':
            result = Math.floor((+time % 60));
        break;
        case 'd':
            result = Math.floor(+time / 3600 / 24);
        break;
    }
    return result;
}

/****
 * 
 * @method 替换掉M
 * 
 * ****/
function replaceStringByKey(str:string,key:string,replace:string){
    let result:string = '';
    for(let i:number=0;i<str.length;++i){
        let item:string = str[i];
        if(item === key){
            result += replace;
            continue;
        }
        result += item;
    }
    return result;
}


/*****
 * 
 * @method 补0
 * 
 * ****/
function fillZero(num:number|string):string{
    return `0${num}`;
}

/***
 * 
 * @method 获取分
 * @param date:{Date}:时间
 * ****/
 function getMinutes(date:Date){
    return date.getMinutes();
}

/***
 * 
 * @method 获取秒
 * @param date:{Date}:时间
 * ****/
 function getSeconds(date:Date){
    return date.getSeconds();
}

/***
 * 
 * @method 获取时
 * @param date:{Date}:时间
 * ****/
 function getHours(date:Date){
    return date.getHours();
}

/***
 * 
 * @method 获取日
 * @param date:{Date}:时间
 * ****/
 function getDay(date:Date){
    return date.getDate();
}

/***
 * 
 * @method 获取星期
 * @param date:{Date}:时间
 * ****/
 function getWeekDay(date:Date){
    return date.getDay();
}

/***
 * 
 * @method 获取月份
 * @param date:{Date}:时间
 * ****/
function getMonth(date:Date){
    return date.getMonth();
}

/***
 * 
 * @method 获取年份
 * @param date:{Date}:时间
 * ****/
 function getYear(date:Date){
    return date.getFullYear();
}

/******
 * 
 * @method 获取时间对象
 * @param time:{number|string}:时间
 * @param seconds:{boolean}:是否是秒
 * 
 * @returns Date
 * 
 * *****/
function getDate(time:number|string):Date {
    if(typeof time === 'number')return new Date(time);
    return new Date(time.toString().replace(/-/g, "/"));
}

export default formatDate;

