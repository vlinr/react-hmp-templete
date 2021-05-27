/****
 * 
 *@method 全局toast 
 * 
 * ****/
declare const PositionType:['bottom','center','top'];

interface FontType{
    maxWidth:number, //最大宽度
    designWidth:number,  //设计尺寸
    fontSize:number, //基数字体大小
}

/******
 * 剩余参数类型
 * **/
interface OtherParams {
    position?:typeof PositionType[number],  //显示位置
    fontSizeType?:FontType, //字体配置
    keepTime?:number, //保持时间，单位毫秒
}

/***
 * 
 * @method 全局toast
 * @param text:{string}提示内容
 * @param other:{OtherParams} 多余的参数
 * *****/
let toast:(text:string,other:OtherParams)=>any = ()=>{};
(()=>{
    let fontSize:number = getFontSize(); //根元素字体大小
    createStyle(fontSize);
    let timer:any = null,
    subTimer:any = null;

    function createStyle(fontSize:number){
        let toast:any = document.querySelector('#toast_style');
        if(toast)toast.remove();
        let style:any = document.createElement('style');
        style.type = 'text/css';
        style.id = 'toast_style';
        style.innerHTML = '\n        #toast {position: fixed;background-color: rgba(231, 235, 246, .95);border-radius:' + 4 * fontSize + 'px;z-index:99999;white-space:nowrap;\n            padding: ' + fontSize*.7 + 'px ' + 2 * fontSize + 'px;font-size: ' + fontSize + 'px;color: #09153C;opacity: 0;visibility: hidden;\n            transition: all .2s ease;-webkit-transition: all .2s ease;-moz-transition: all .2s ease;-ms-transition: all .2s ease;\n            -o-transition: all .2s ease;-webkit-border-radius: ' + 4 * fontSize + 'px;-moz-border-radius: ' + 4 * fontSize + 'px;-ms-border-radius: ' + 4 * fontSize + 'px;-o-border-radius: ' + 4 * fontSize + 'px;\n        }\n\n        #toast.bottom_default{\n            bottom: -30vh;\n            left: 50%;\n            transform: translateX(-50%);\n            -webkit-transform: translateX(-50%);\n            -moz-transform: translateX(-50%);\n            -ms-transform: translateX(-50%);\n            -o-transform: translateX(-50%);\n        }\n\n        #toast.center_default{\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%,-50%);\n            -webkit-transform: translate(-50%,-50%);\n            -moz-transform: translate(-50%,-50%);\n            -ms-transform: translate(-50%,-50%);\n            -o-transform: translate(-50%,-50%);\n        }\n\n        #toast.top_default{\n            top: -30vh;\n            left: 50%;\n            transform: translateX(-50%);\n            -webkit-transform: translateX(-50%);\n            -moz-transform: translateX(-50%);\n            -ms-transform: translateX(-50%);\n            -o-transform: translateX(-50%);\n        }\n\n        #toast.bottom_active {opacity: 1;visibility: visible;bottom: 5%;}\n        #toast.center_active {opacity: 1;visibility: visible;top: 50%;}\n        #toast.top_active {opacity: 1;visibility: visible;top: 5%;}\n\n        #toast.bottom_out{\n            bottom: -30vh;\n        }\n        #toast.center_out{\n            top: 50%;\n        }\n        #toast.top_out{\n            top: -30vh;\n        }\n    ';
        document.head.appendChild(style);
    }

    function showToast(text:string,other:OtherParams) {
        const otherParams:OtherParams = {position:'bottom',keepTime:1500,...other};
        otherParams.fontSizeType && createStyle(getFontSize(otherParams.fontSizeType)); //从新创建样式
        let toast:any = document.querySelector('#toast');
        if (!toast) {
            toast = document.createElement('section');
            toast.id = 'toast';
        }
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (subTimer) {
            clearTimeout(subTimer);
            subTimer = null;
        }
        if (toast.innerHTML !== text) toast.innerHTML = text;
        updateItemClass(toast, otherParams.position + '_default');
        document.body.appendChild(toast);

        setTimeout(function () {
            updateItemClass(toast, otherParams.position + '_active');
        }, 0);
        if(otherParams.keepTime && otherParams.keepTime< 0)return;
        timer = setTimeout(function () {
            updateItemClass(toast, otherParams.position + '_out');
            subTimer = setTimeout(function () {
                toast.remove();
            }, 100);
        }, otherParams.keepTime);
    }
    toast = showToast;
    /**
     * 
     * 添加单个对应的样式
     * 
     */
    function updateItemClass(el:any, className:string) {
        let oldClassName:string = el.getAttribute('class');
        if (oldClassName) oldClassName.trim();
        if (!oldClassName || !findHaveClass(oldClassName, className)) {
            el.setAttribute('class', !oldClassName ? className : oldClassName + ' ' + className);
        }
    }
    /***
     * 查询是否有这个样式
     * **/
    function findHaveClass(oldClassName:string, className:string) {
        return oldClassName.indexOf(className) !== -1;
    }

    /****
     * 
     * 获取当前字体大小
     * 
     * *****/
    function getFontSize(params:FontType={
        maxWidth:750,
        designWidth:375,
        fontSize:14
    }):number{
       return conputedFontSize(params);
    }
    
    /*****
     * 
     * 计算字体大小
     * *****/
    function conputedFontSize(params:FontType):number{
        if(params.designWidth === 0)return params.fontSize;
        const width = window.innerWidth || document.body.clientWidth;
        if (width > params.maxWidth) {
            return params.maxWidth / params.designWidth * params.fontSize;
        } else {
            return width / params.designWidth * params.fontSize;
        }
    }
})();

export default toast;