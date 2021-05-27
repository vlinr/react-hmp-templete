
(function () {

    var fontSize = parseFloat(document.documentElement.style.fontSize.split('px')[0]) || (window.innerWidth || document.body.clientWidth) / 375 * 14; //根元素字体大小
    if (fontSize > 28) fontSize = 28;
    /*****创建样式******/
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '\n        #toast {position: fixed;background-color: rgba(231, 235, 246, .95);border-radius:' + 4 * fontSize + 'px;z-index:99999;white-space:nowrap;\n            padding: ' + fontSize * 0.7 + 'px ' + 2 * fontSize + 'px;font-size: ' + fontSize + 'px;color: #09153C;opacity: 0;visibility: hidden;\n            transition: all .2s ease;-webkit-transition: all .2s ease;-moz-transition: all .2s ease;-ms-transition: all .2s ease;\n            -o-transition: all .2s ease;-webkit-border-radius: ' + 4 * fontSize + 'px;-moz-border-radius: ' + 4 * fontSize + 'px;-ms-border-radius: ' + 4 * fontSize + 'px;-o-border-radius: ' + 4 * fontSize + 'px;\n        }\n\n        #toast.bottom_default{\n            bottom: -30vh;\n            left: 50%;\n            transform: translateX(-50%);\n            -webkit-transform: translateX(-50%);\n            -moz-transform: translateX(-50%);\n            -ms-transform: translateX(-50%);\n            -o-transform: translateX(-50%);\n        }\n\n        #toast.center_default{\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%,-50%);\n            -webkit-transform: translate(-50%,-50%);\n            -moz-transform: translate(-50%,-50%);\n            -ms-transform: translate(-50%,-50%);\n            -o-transform: translate(-50%,-50%);\n        }\n\n        #toast.top_default{\n            top: -30vh;\n            left: 50%;\n            transform: translateX(-50%);\n            -webkit-transform: translateX(-50%);\n            -moz-transform: translateX(-50%);\n            -ms-transform: translateX(-50%);\n            -o-transform: translateX(-50%);\n        }\n\n        #toast.bottom_active {opacity: 1;visibility: visible;bottom: 5%;}\n        #toast.center_active {opacity: 1;visibility: visible;top: 50%;}\n        #toast.top_active {opacity: 1;visibility: visible;top: 5%;}\n\n        #toast.bottom_out{\n            bottom: -30vh;\n        }\n        #toast.center_out{\n            top: 50%;\n        }\n        #toast.top_out{\n            top: -30vh;\n        }\n    ';
    document.head.appendChild(style);

    var timer = null,
        subTimer = null;
    function showToast(text) {
        var aninName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bottom';


        var toast = document.querySelector('#toast');

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

        if (toast.innerHTML != text) toast.innerHTML = text;

        updateItemClass(toast, aninName + '_default');
        document.body.appendChild(toast);
        setTimeout(function () {
            updateItemClass(toast, aninName + '_active');
        }, 0);

        timer = setTimeout(function () {
            updateItemClass(toast, aninName + '_out');
            subTimer = setTimeout(function () {
                toast.remove();
            }, 100);
        }, 1500);
    }
    if (window) {
        window.toast = showToast;
    } else if (global) {
        global.toast = showToast;
    } else {
        console.error('Nonexistent global object,Global or Window is undefined!');
    }
    /**
     * 
     * 移除单个对应的样式
     * 
     */
    function clearItemClass(el, className) {
        var oldClassName = el.getAttribute('class');
        if (oldClassName) oldClassName.trim();
        if (oldClassName && findHaveClass(oldClassName, className)) {
            var reg = new RegExp(className);
            var newClassName = el.getAttribute('class').replace(reg, '').trim();
            el.setAttribute('class', newClassName);
        }
    }

    /**
     * 
     * 添加单个对应的样式
     * 
     */
    function updateItemClass(el, className) {
        var oldClassName = el.getAttribute('class');
        if (oldClassName) oldClassName.trim();
        if (!oldClassName || !findHaveClass(oldClassName, className)) {
            el.setAttribute('class', !oldClassName ? className : oldClassName + ' ' + className);
        }
    }

    /***
     * 查询是否有这个样式
     * **/
    function findHaveClass(oldClassName, className) {
        return oldClassName.indexOf(className) != -1;
    }
})();