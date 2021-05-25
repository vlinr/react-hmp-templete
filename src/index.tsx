import * as React from "react";
import ReactDOM from "react-dom";
import "@/index.less";
import App from "@/App";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "@/models/store";
import zhCN from "antd/es/locale/zh_CN";
import "moment/locale/zh-cn";
import setHtmlFontSize from "@/utils/setHtmlFontSize";
import { VIEW_TO_REM_INFO } from "./config/config";
setHtmlFontSize(VIEW_TO_REM_INFO); //初始化得时候设置一下字体大小

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
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
