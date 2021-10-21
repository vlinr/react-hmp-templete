import * as React from "react";
import ReactDOM from "react-dom";
import "@/index.less";
import App from "@/App";
import { Provider } from "react-redux";
import { store } from "@/models/store";
import setHtmlFontSize from "@/utils/setHtmlFontSize";
import { VIEW_TO_REM_INFO } from "./config/config";
import LocaleConfigProvider from './LocaleConfigProvider';
import { ConfigProvider } from 'react-vant';
import theme from '@/config/theme';
setHtmlFontSize(VIEW_TO_REM_INFO); //初始化得时候设置一下字体大小
// (window as any).onerror = function (e:string) {
//   console.log("运行错误", e);
// };
// window.addEventListener("error", (e:any) => {
//   console.log("运行错误", e.message);
// });
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider themeVars={theme}>
      <LocaleConfigProvider>
            <App />
      </LocaleConfigProvider>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

console.log(`  

     $$$$$$     $$$$$$     $$$$$$     
        $$          $$    $$    $$  
        $$          $$    $$         
        $$          $$    $$  $$$$     
  $$$$  $$    $$$$  $$    $$    $$ 
  $$    $$    $$    $$    $$    $$    
   $$$$$$      $$$$$$      $$$$$$       

`);
