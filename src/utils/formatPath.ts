//去掉最后一个/
const formatPath = (path: string): string => {
    if (path === '/') return path;
    let reg:RegExp = new RegExp("/$");
    if (path.length > 0 && reg.test(path)) {
        return path.substring(0, path.length - 1);
    }
    return path;
}
export default formatPath;