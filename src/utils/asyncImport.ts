import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import Files from '@/importFile/importFile';
function AsyncImport(componentName: string | undefined) {
    if(!componentName)return;
    return Loadable({
        loader: Files[componentName as string],
        loading: Loading
    })
}
export default AsyncImport;