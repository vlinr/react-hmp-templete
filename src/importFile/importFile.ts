import { routerFlatten } from '@/routers';
import ROUTER_CONFIG, { RouteItemType } from '@/config/router.config';

interface FilesType {
    [name: string]: () => any;
}
const FlattenRouters: Array<RouteItemType> = routerFlatten(ROUTER_CONFIG);

const Files: FilesType = {};

FlattenRouters.forEach((item: RouteItemType) => {
    Files[`${item.component}`] = () => import(`@/pages/${item.component}`);
});

export default Files;
