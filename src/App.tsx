import "@/App.less";
// import "braft-editor/dist/index.css";
import { hot } from "react-hot-loader/root";
import AppRouter from "@/routers/index";
function App() {
  return AppRouter;
}
//热更新
const AppHot = process.env.NODE_ENV === "development" ? hot(App) : App;
export default AppHot;
