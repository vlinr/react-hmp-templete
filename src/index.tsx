import * as React from "react";
import ReactDOM from "react-dom";
import "@/index.less";
import App from "@/App";
import { Provider } from "react-redux";
import { store } from "@/models/store";
import setHtmlFontSize from "@/utils/setHtmlFontSize";
import { VIEW_TO_REM_INFO } from "./config/config";

setHtmlFontSize(VIEW_TO_REM_INFO); //初始化得时候设置一下字体大小
// (window as any).onerror = function (e:string) {
//   console.log("运行错误", e);
// };
// window.addEventListener("error", (e:any) => {
//   console.log("运行错误", e.message);
// });
{
  /* <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocaleProvider> */
}
ReactDOM.render(
  <Provider store={store}>
    <App />
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
