// ie
import 'core-js/stable';
import 'whatwg-fetch';
import 'abortcontroller-polyfill';
// ie 10
import 'intl';
import 'intl/locale-data/jsonp/en';

import { render } from 'react-dom';
import '@/index.less';
import App from '@/App';
import { Provider } from 'react-redux';
import { store } from '@/models/store';
import setHtmlFontSize from '@/utils/setHtmlFontSize';
import { VIEW_TO_REM_INFO } from './config/config';
import LocaleConfigProvider from './LocaleConfigProvider';
setHtmlFontSize(VIEW_TO_REM_INFO);
render(
    <Provider store={store}>
        <LocaleConfigProvider>
            <App />
        </LocaleConfigProvider>
    </Provider>,
    document.getElementById('root'),
);
