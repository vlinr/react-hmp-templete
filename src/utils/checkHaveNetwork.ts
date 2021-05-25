interface NetworkType{
    onLine:boolean,
    downlink:number
}
function checkHaveNetwork():NetworkType{
    return {
        onLine:window.navigator.onLine,
        downlink:(window as any).navigator?.connection?.downlink || 0
    }
}
export default checkHaveNetwork;