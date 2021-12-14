import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import antdZhCN from 'antd/es/locale/zh_CN';
import antdEnUS from 'antd/es/locale/en_US';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { LangType } from './models/locale';
import { RootState } from './models/store';
import { zhCN, enUS } from '@/locale/index';
import dayjs from 'dayjs';

import intl from 'react-intl-universal';

const localeData = createSelector(
    (state: RootState) => state.locale,
    (locale: LangType) => locale.language
);

type PropsType = {
    children: React.ReactNode;
};

/*
 *
 * @function 获取antd的语言文件
 *
 * **/

function getLanguageByAntd(type: string) {
    let result: any = {};
    switch (type) {
        case 'en':
            result = antdEnUS;
            break;
        case 'zh':
            result = antdZhCN;
            break;
    }
    return result;
}

/*
 *
 * @function 获取用户自定义文件配置
 *
 * **/

function getLanguageByUser(type: string) {
    let result: any = {};
    switch (type) {
        case 'en':
            result = enUS;
            break;
        case 'zh':
            result = zhCN;
            break;
    }
    return result;
}

/*
 *
 * @function 获取dayjs配置
 *
 * **/

function getLanguageByDayjs(type: string) {
    let result: any = {};
    switch (type) {
        case 'en':
            result = 'en';
            break;
        case 'zh':
            result = 'zh-cn';
            break;
    }
    return result;
}

/*
 *
 * @function 国际化配置
 *
 * **/

const LocaleConfigProvider = ({ children }: PropsType) => {
    const language: string = useSelector(localeData);
    // 根据store里面的选项，进行设置相应的内容
    useEffect(() => {
        dayjs.locale(getLanguageByDayjs(language));
        intl.init({
            currentLocale: language,
            warningHandler: () => {
                return '';
            },
            locales: {
                zh: zhCN,
                en: enUS
            }
        });
    }, [language]);

    return (
        <IntlProvider messages={getLanguageByUser(language)} locale={language}>
            <ConfigProvider locale={getLanguageByAntd(language)}>{children}</ConfigProvider>
        </IntlProvider>
    );
};

export default LocaleConfigProvider;
