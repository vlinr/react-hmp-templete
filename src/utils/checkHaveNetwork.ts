interface NetworkType {
    onLine: boolean; // 是否在线
    downlink: number; // 下载速度
}

/*
 *
 * @method 检查是否有网络
 *
 * @returns NetworkType
 *
 * ****/
function checkHaveNetwork(): NetworkType {
    const win: any = window;
    return {
        onLine: window.navigator.onLine,
        downlink: win.navigator?.connection?.downlink || 0
    };
}

export default checkHaveNetwork;
