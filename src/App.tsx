import '@/App.less';
// import "braft-editor/dist/index.css";
import AppRouter from '@/routers/index.tsx';

const App = () => {
    return AppRouter;
};
// 热更新
// const AppHot = process?.env?.NODE_ENV === 'development' ? hot(App) : App;
export default App;
