
import React, { useEffect } from 'react';
import "moment/locale/zh-cn";
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import { LangType } from './models/locale';
import { RootState } from './models/store';
import moment from 'moment';
import {zhCN,enUS} from '@/locale/index';
import intl from 'react-intl-universal'

const localeData = createSelector((state:RootState)=>state.locale,(locale:LangType)=>locale.language)

type PropsType = {
    children:React.ReactNode
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

    useEffect(()=>{

        moment.locale(language);
        
        // 自定义国际化配置
        intl.init({

            currentLocale:language,

            locales:{
                'zh':zhCN,
                'en':enUS
            },

        })
        
    },[language])

    return <>{children}</>
}

export default LocaleConfigProvider;