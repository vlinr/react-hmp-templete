import ReactDOM from 'react-dom';
import '@/index.less';
import App from '@/App';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/models/store';
import setHtmlFontSize from '@/utils/setHtmlFontSize';
import { VIEW_TO_REM_INFO } from './config/config';
import LocaleConfigProvider from './LocaleConfigProvider';
setHtmlFontSize(VIEW_TO_REM_INFO); // 初始化得时候设置一下字体大小
ReactDOM.render(
    <Provider store={store}>
        <LocaleConfigProvider>
            <App />
        </LocaleConfigProvider>
    </Provider>,
    document.getElementById('root'),
);
