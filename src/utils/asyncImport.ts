import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import Files from '@/importFile/importFile';


/******
 * 
 *@method 使用Loadble插件进行异步导入组件 
 * @param componentName:{string}:组件名称
 * 
 * ***/
function AsyncImport(componentName?: string ) {
    if(!componentName)return;
    return Loadable({
        loader: Files[componentName as string],
        loading: Loading
    })
}
export default AsyncImport;