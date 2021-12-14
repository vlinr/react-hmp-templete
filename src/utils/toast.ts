/**
 * ***
 *
 * @format
 * @method 全局toast
 */

import { Toast } from '@/typing';

/**
 *
 * @method 全局toast
 * @param text:{string}提示内容
 * @param other:{OtherParams} 多余的参数
 * *****/
let toast: Toast.ToastFuncType;
(() => {
    const fontSize: number = getFontSize();
    const timerInfo: any = {};
    createStyle(fontSize);
    function createStyle(fontSize: number) {
        const toast: any = document.querySelector('#toast_style');
        if (toast) toast.remove();
        const style: any = document.createElement('style');
        style.type = 'text/css';
        style.id = 'toast_style';
        style.innerHTML =
            '.global_toast {position: fixed;background-color: rgba(231, 235, 246, .95);border-radius:' +
            4 * fontSize +
            'px;z-index:99999;white-space:nowrap;padding: ' +
            fontSize * 0.7 +
            'px ' +
            2 * fontSize +
            'px;font-size: ' +
            fontSize +
            'px;color: #09153C;opacity: 0;visibility: hidden;transition: all .2s ease;-webkit-transition: all .2s ease;-moz-transition: all .2s ease;-ms-transition: all .2s ease;-o-transition: all .2s ease;-webkit-border-radius: ' +
            4 * fontSize +
            'px;-moz-border-radius: ' +
            4 * fontSize +
            'px;-ms-border-radius: ' +
            4 * fontSize +
            'px;-o-border-radius: ' +
            4 * fontSize +
            'px;}.global_toast.bottom_default{bottom: -30vh;top:auto;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);    }.global_toast.center_default{top: 50%;bottom:auto;left: 50%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);    }.global_toast.top_default{top: -30vh;bottom:auto;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);    }.global_toast.bottom_active {opacity: 1;visibility: visible;bottom: 5%;top:auto;}    .global_toast.center_active {opacity: 1;visibility: visible;top: 50%;bottom:auto;}    .global_toast.top_active {opacity: 1;visibility: visible;top: 5%;bottom:auto;}.global_toast.bottom_out{bottom: -30vh;top:auto;    }    .global_toast.center_out{top: 50%;bottom:auto;    }    .global_toast.top_out{top: -30vh;bottom:auto;    }';
        document.head.appendChild(style);
    }

    /**
     *
     * @method 显示toast
     * @param text:{string} 需要展示的文字
     * @param other:{OtherParams} 更多参数
     *
     * *****/
    function showToast(text: string, other?: Toast.OtherParams) {
        const otherParams: Toast.OtherParams = { position: 'bottom', keepTime: 1500, ...other };
        otherParams.fontSizeType && createStyle(getFontSize(otherParams.fontSizeType));
        let toast: any = document.querySelector('#' + otherParams.position + '_toast');
        if (!toast) {
            toast = document.createElement('section');
            toast.id = otherParams.position + '_toast';
            toast.setAttribute('class', 'global_toast');
        }
        if (timerInfo[otherParams.position + '_parent']) {
            clearTimeout(timerInfo[otherParams.position + '_parent']);
            timerInfo[otherParams.position + '_parent'] = null;
        }
        if (timerInfo[otherParams.position + '_child']) {
            clearTimeout(timerInfo[otherParams.position + '_child']);
            timerInfo[otherParams.position + '_child'] = null;
        }
        if (otherParams.style) {
            for (const key in otherParams.style) toast.style[key] = otherParams.style[key];
        }
        if (toast.innerHTML !== text) toast.innerHTML = text;
        updateItemClass(toast, otherParams.position + '_default');
        document.body.appendChild(toast);

        setTimeout(function () {
            updateItemClass(toast, otherParams.position + '_active');
        }, 0);
        if (otherParams.keepTime && otherParams.keepTime < 0) return;
        timerInfo[otherParams.position + '_parent'] = setTimeout(function () {
            updateItemClass(toast, otherParams.position + '_out');
            timerInfo[otherParams.position + '_child'] = setTimeout(function () {
                toast.remove();
            }, 100);
        }, otherParams.keepTime);
    }
    toast = showToast;
    /**
     *
     * @function  添加单个对应的样式
     *
     */
    function updateItemClass(el: any, className: string) {
        const oldClassName: string = el.getAttribute('class');
        if (oldClassName) oldClassName.trim();
        if (!oldClassName || !findHaveClass(oldClassName, className)) {
            el.setAttribute('class', !oldClassName ? className : oldClassName + ' ' + className);
        }
    }
    /*
     * 查询是否有这个样式
     * **/
    function findHaveClass(oldClassName: string, className: string) {
        return oldClassName.indexOf(className) !== -1;
    }

    /**
     *
     * @function 获取当前字体大小
     *
     * *****/
    function getFontSize(
        params: Toast.FontType = {
            maxWidth: 750,
            designWidth: 375,
            fontSize: 14,
        },
    ): number {
        return computedFontSize(params);
    }

    /**
     *
     * @function  计算字体大小
     * *****/
    function computedFontSize(params: Toast.FontType): number {
        if (params.designWidth === 0) return params.fontSize;
        const width = window.innerWidth || document.body.clientWidth;
        if (width > params.maxWidth) {
            return (params.maxWidth / params.designWidth) * params.fontSize;
        } else {
            return (width / params.designWidth) * params.fontSize;
        }
    }
})();

export default toast;
