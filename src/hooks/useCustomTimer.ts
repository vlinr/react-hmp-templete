
import * as React from 'react';
const {useEffect,useRef,useCallback,useState} = React;
/*****
 * 
 * @method 倒计时
 * @param down:是否是倒计时
 * @param endNum:结束值
 * 
 * ***/
function useCustomTimer(down:boolean = true,endNum:number = 0){
    const timeRef = useRef<any>(null);
    const [time,setTime] = useState<number>();
    /****
     * 
     * @method 开始计时器
     * @param time:{number}时间，单位：秒
     * @param callback:{Function}：执行一次deeps的回调，回调结果当前时间：秒
     * @param deeps:{number}:时间深度，单位：毫秒
     * 
     * ****/
    const startTimer = 
    (time:number,callback?:Function,deeps:number=1000,resume:boolean = false) => {
        if(timeRef?.current?.timer)return;
        let end:boolean = false;
        timeRef.current = {};
        timeRef.current.timeNum = time;
        timeRef.current.deeps = deeps;
        timeRef.current.callback = callback;
        setTime(time);
        !resume && callback?.(time);
        timeRef.current.timer = setInterval(e=>{
            if(down){
                time -= 1;
                if(time <= endNum )end = true;
            }else{
                time += 1;
                if(time >= endNum )end = true;
            }
            callback?.(time);
            timeRef.current.timeNum = time;
            setTime(time);
            if(end){
                cancelTimer();
            }
        },deeps)
    }
    /****
     * 
     * @method 恢复
     * 
     * ****/
    const resumeTimer = 
    () => {
        if(!timeRef?.current){
            throw new Error('Failed to resume execution for timer not created~');
        }
        startTimer?.(timeRef?.current?.timeNum,timeRef?.current?.callback,timeRef?.current?.deeps,true);
    }
    /****
     * 
     * @method 暂停
     * 
     * ****/
    const pauseTimer = 
    () => {
        cancelTimer?.(false);
    }

    /****
     * 
     * @method 取消计时器
     * @param cancel:{boolean}：是否是取消
     * ****/
    const cancelTimer = useCallback(
        (cancel:boolean = true) => {
            if(timeRef?.current?.timer){
                clearInterval(timeRef.current.timer);
                timeRef.current.timer = null;
                cancel && (timeRef.current = null);
            }
        },
        [],
    )

    useEffect(() => {
        return () => {
            cancelTimer();
        }
    }, [])

    return {
        pauseTimer,resumeTimer,startTimer,cancelTimer,time
    };

}


export default useCustomTimer;
