
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from "antd";
import antdZhCN from "antd/es/locale/zh_CN";
import antdEnUS from "antd/es/locale/en_US";
import "moment/locale/zh-cn";
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import { LangType } from './models/locale';
import { RootState } from './models/store';
import moment from 'moment';
import {zhCN,enUS} from './config/locale.message';


const localeData = createSelector((state:RootState)=>state.locale,(locale:LangType)=>locale.language)

type PropsType = {
    children:React.ReactNode
} 

/***
 * 
 * @function 获取antd的语言文件
 * 
 * **/
function getLanguageByAntd(type:string){
    switch(type){
        case 'en':
            return antdEnUS;
        break;
        case 'zh':
            return antdZhCN;
        break;
    }
}

/***
 * 
 * @function 获取用户自定义文件配置
 * 
 * **/
 function getLanguageByUser(type:string){
    switch(type){
        case 'en':
            return enUS;
        break;
        case 'zh':
            return zhCN;
        break;
    }
}

/***
 * 
 * @function 国际化配置
 * 
 * **/
const LocaleConfigProvider = ({children}:PropsType)=>{
    const language:string = useSelector(localeData);
    //根据store里面的选项，进行设置相应的内容
    useEffect(()=>{
        moment.locale(language);
        console.log(getLanguageByUser(language))
    },[language])

    return <IntlProvider messages={getLanguageByUser(language)} locale={language}>
            <ConfigProvider locale={getLanguageByAntd(language)}>
                {
                    children
                }
            </ConfigProvider>
    </IntlProvider>
}

export default LocaleConfigProvider;