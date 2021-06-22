
import * as React from 'react';
const {useEffect,useRef} = React;

/****
 * 
 * @methed 心跳计时器
 * 
 * @param deeps:心跳多久执行一次，实际的timer运行间隔，不可更改
 * @param jumpHeartDeeps:心跳多久跳一次，可更改
 * @param executeNow:是否立即执行一次
 * 
 * *****/
function useHreatTimer(deeps:number = 1000,jumpHeartDeeps:number = 1000,executeNow:boolean = true){
    
    const timeRef:any = useRef();
    
    //开启心跳
    const startHeart = 
    (callback?:Function) => {
        if(timeRef?.current?.timer){
            resumeHeart?.();
            return;
        }
        createCurrent();
        executeNow && callback?.(); //就看是否需要立即执行一次
        timeRef.current.timer = setInterval(e=>{
            if(timeRef?.current?.pause)return; //是否是暂停
            timeRef.current.timeNum += deeps; //每次加上步长
            if(timeRef.current.timeNum >= timeRef?.current?.jumpHeartDeeps){ //步长超过了心跳的值，进行回调，重置计时
                callback?.();
                timeRef.current.timeNum = timeRef.current.timeNum - timeRef?.current?.jumpHeartDeeps;  //超过的内容，作为下一次的时间
            }
        },deeps);
    }

    //停止心跳
    const stopHeart = 
    () => {
        if(timeRef?.current?.timer){
            clearInterval(timeRef.current.timer);
            timeRef.current.timer = null;
            timeRef.current = null;
        }
    }

    //暂停心跳
    const pauseHeart = 
    () => {
        timeRef.current.pause = true;
    }

    //恢复心跳
    const resumeHeart = 
    () => {
        timeRef.current.pause = false;
    }
    
    //设置心跳时间
    const setJumpHeartDeeps = (deeps:number)=>{
        createCurrent();
        timeRef.current.jumpHeartDeeps = deeps;
    }

    //创建current
    const createCurrent = ()=>{
        if(!timeRef?.current){
            timeRef.current = {};
            timeRef.current.deeps = deeps;
            timeRef.current.timeNum = 0;
            timeRef.current.jumpHeartDeeps = jumpHeartDeeps;
        }
    }

    useEffect(() => {
        return () => {
            stopHeart();
        }
    }, [])

    return {
        startHeart,stopHeart,setJumpHeartDeeps,pauseHeart,resumeHeart
    }

}


export default useHreatTimer;
