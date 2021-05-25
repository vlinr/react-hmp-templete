
import {  onWindowResize } from '@/bridge/ipcRender';
import * as React from 'react';

const {useRef,useCallback,useState,useEffect} = React;
let resizeTimer:any = null;
/****
 * 
 * 16:9宽高缩放
 * 
 * ****/
function useResizeWidth(initWidth:number,boxRef:any){
    const timer = useRef<any>();
    const [resizeInfo,setResizeInfo] = useState<any>({
        width:initWidth,
        height:0
    });



    useEffect(()=>{
        onWindowResize?.(()=>{
            resizeMthod();
        })
        window.addEventListener('resize',resizeMthod);
        return ()=>{
            boxRef.current = null;
            window.removeEventListener('resize',resizeMthod);
        }
    },[boxRef])

    //窗口大小变化
    const resize = useCallback(
        () => {
            if(!boxRef?.current)return;
            // const {height} = boxRef?.current?.getBoundingClientRect(); //当前盒子的高度
            // // getScreenInfo?.()?.then((res:any)=>{ //只能获取主屏幕大小，无法获取扩展屏幕带线啊哦
            //    const SCREEN_WIDTH:number = window.innerWidth;
            // //    const SCREEN_HEIGHT:number = res?.workAreaSize?.height; 
            // //    let scale:number = SCREEN_WIDTH / SCREEN_HEIGHT;
            //    let nowWidth:number = height * 16 / 9 ; //判断如果这个宽度超过了实际宽度，那么以宽度去设置
            //    let nowHeight:number = 0;
            //    if(nowWidth > SCREEN_WIDTH){  //计算过后的宽度比实际宽度大，那么当前宽度就等于屏幕宽度，从新计算一个高度值
            //        nowWidth = SCREEN_WIDTH; //最大宽度
            //        nowHeight = SCREEN_WIDTH * 9 / 16;
            //    }else{
            //        nowHeight = height;
            //    }
            //    setResizeInfo({
            //        width:nowWidth,
            //        height:nowHeight
            //    });
            // });
            if(resizeTimer){
                clearTimeout(resizeTimer);
                resizeTimer = null;
            }
            resizeTimer = setTimeout(() => {
                const {height,width} = boxRef?.current?.getBoundingClientRect(); //当前盒子的高度
                const screenWidth:number = window.innerWidth;
                let nowWidth:number = height * 16 / 9 ; //判断如果这个宽度超过了实际宽度，那么以宽度去设置
                let nowHeight:number = 0;
                //可能高度超过了，可能宽度超过了
                console.log(nowWidth,width)
                if(nowWidth > screenWidth){  //计算过后的宽度比实际宽度大，或者超过这个盒子的宽度
                    nowWidth = screenWidth; //最大宽度
                    nowHeight = screenWidth * 9 / 16;
                }else if(nowWidth > width && nowWidth < screenWidth){
                    nowWidth = width; //最大宽度
                    nowHeight = nowWidth * 9 / 16;
                }else{
                    nowHeight = height;
                }
                setResizeInfo({
                    width:nowWidth,
                    height:nowHeight
                });
                clearTimeout(resizeTimer);
                resizeTimer = null;
            },200);
        },
        [setResizeInfo,boxRef],
    )

    const resizeMthod= useCallback(()=>{
        if(timer.current){
            return;
        }
        timer.current = setTimeout(() => {
            clearTimeout(timer.current);
            timer.current = null;
            resize();
        }, 500);
    },[resize])
    return [resizeInfo,resize] as const;

}


export default useResizeWidth;
