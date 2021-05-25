
import * as React from 'react';
const {useEffect} = React;

/****
 * 
 * @methed 心跳计时器
 * 
 * @param deeps:心跳多久执行一次，实际的timer运行间隔，不可更改
 * @param jumpHeartDeeps:心跳多久跳一次，可更改
 * @param executeNow:是否立即执行一次
 * 
 * *****/
let timeRef:any = null;
function useTimerHreat(deeps:number = 1000,jumpHeartDeeps:number = 1000,executeNow:boolean = true){
    if(!timeRef){
        timeRef = {};
        timeRef.deeps = deeps;
        timeRef.jumpHeartDeeps = jumpHeartDeeps;
    }
    //开启心跳
    const startHeart = 
    (callback?:Function) => {
        if(timeRef?.timer){
            resumeHeart?.();
            return;
        }
        let timeNum:number = 0;
        executeNow && callback?.(); //就看是否需要立即执行一次
        timeRef.timer = setInterval(e=>{
            if(timeRef?.pause)return; //是否是暂停
            timeNum += deeps; //每次加上步长
            if(timeNum >= timeRef?.jumpHeartDeeps){ //步长超过了心跳的值，进行回调，重置计时
                callback?.();
                timeNum = timeNum - timeRef?.jumpHeartDeeps;  //超过的内容，作为下一次的时间
            }
        },deeps);
    }

    //停止心跳
    const stopHeart = 
    () => {
        if(timeRef?.timer){
            clearInterval(timeRef.timer);
            timeRef.timer = null;
            timeRef = null;
        }
    }
    //暂停心跳
    const pauseHeart = 
    () => {
        timeRef.pause = true;
    }
    //恢复心跳
    const resumeHeart = 
    () => {
        timeRef.pause = false;
    }
    //设置心跳时间
    const setJumpHeartDeeps = (deeps:number)=>{
        timeRef.jumpHeartDeeps = deeps;
    }

    useEffect(() => {
        return () => {
            stopHeart();
        }
    }, [])

    return [startHeart,stopHeart,setJumpHeartDeeps,pauseHeart,resumeHeart] as const;

}


export default useTimerHreat;
