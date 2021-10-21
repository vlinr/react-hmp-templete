import { useEffect,useState,useCallback,useRef } from "react";
import { IntersectionObserver } from "@/assets/js/intersection-observer";
import createUUID from "@/utils/createUUID";

type BoundingType = {
    bottom:number
    height:number
    left:number
    right:number
    top:number
    width:number
    x:number
    y:number,
    [key:string]:number
}

export type IntersectionObserverEntryType = {
    boundingClientRect:BoundingType
    intersectionRatio: number
    intersectionRect: BoundingType
    isIntersecting: boolean
    rootBounds:BoundingType
    target: Element
    time:number,
    key:string,
    parentRect?:DOMRect
}

type StatusType = {
    [key:string]:boolean
}

export type UniqueType = {
    callback?:(io:IntersectionObserverEntryType)=>void,
    key:string,
    el:Element,
    parent?:Element
}

type IoRefType<T> = {
    io:IntersectionObserverType | null
    params:T | null
}

type IntersectionObserverType = {
    observe:(target:Element)=>void,
    unobserve:(target:Element)=>void,
    disconnect:()=>void,
    getTargets:()=>IntersectionObserverEntryType[],
    POLL_INTERVAL:number
}


const KEY_NAME:string = 'io_key'; //key绑定的键名

/****
 * 
 * @function 获取对应元素
 * 
 * 
 * *****/
const getElementByKey = (list:UniqueType[],key:string):UniqueType | null=>{
    let index:number = list?.findIndex((item:UniqueType)=>{
        return item?.key === key;
    })
    return index === -1?null:list[index];
}

/*****
 * 
 * @hooks 添加对应元素监听是否在某个区域
 * @params throtileTimeOut:{number} | 100:多久执行一次
 * 
 * ****/

function useFixed(throtileTimeOut:number = 100){

    const [status,setStatus] = useState<StatusType>({}); //是否显示
    const ioRef = useRef<IoRefType<{targets?:UniqueType[]}> | null>(null); 

    /*****
   * 
   * @function 启动侦听器
   * 
   * *****/
  useEffect(() => {
    createIO();
  }, []);

  /*****
   * 
   * @function 创建IntersectionObserver
   * 
   * ***/
  const createIO = useCallback(
      () => {
          if(!ioRef?.current){
            ioRef.current = {
                io:null,
                params:{}
            };
          }
          if(!ioRef?.current?.io){
            IntersectionObserver.prototype.THROTTLE_TIMEOUT = throtileTimeOut;
            ioRef.current.io = new IntersectionObserver(entryListener);
          }
      },
      [],
  )

  /****
   * 
   * @function 添加监听元素
   * @params {
   *    el:{Element}:需要监听的元素
   *    [key:{string}]:可选，指定key
   *    [callback:Function]:可选，用作接收回调
   *    [parent:Element]:可选，父元素
   * }
   * 
   * *****/
  const addElement = useCallback(
      ({ el, key,callback,parent }:UniqueType):UniqueType => {
        createIO();
       let uniqueEl:UniqueType = createUniqueId({ el, key,callback,parent }); //生成唯一的key
       updateStatus(uniqueEl.key,false);
       addCache(uniqueEl);
       ioRef?.current?.io?.observe(uniqueEl.el);
       return uniqueEl;
      },
      [],
  )
  
  /******
   * 
   * @function 追加存储targets
   * @params target:{UniqueType}:需要添加的元素
   * 
   * *****/
  const addCache = useCallback(
      (target:UniqueType) => {
          if(ioRef.current && ioRef.current.params){
            if(!ioRef?.current?.params?.targets) ioRef.current.params.targets = [];
            let index:number =ioRef?.current?.params?.targets?.findIndex((item:UniqueType)=>{
                return target.key === item.key;
            });
            if(index === -1){
                ioRef.current.params.targets.push(target);
            }else{
                ioRef.current.params.targets[index] = target;
                console.warn('Key is not unique,may cause incorrect status.')
            }
        }
    },
      [],
  )

  /***
   * 
   * @function 生成唯一的key
   * @params el:{Element}:需要生成key的el
   * @params [key:{string}]:可选，指定key
   * @params [callback:Function]:可选，用作接收回调
   * 
   * ****/
    const createUniqueId = useCallback(
        ({ el, key:attribute_key,callback,parent }:UniqueType):UniqueType => {
            let key:string = attribute_key || createUUID();
            el.setAttribute(KEY_NAME,key); //对应的el生成一个fixed_key
            return {
                key,el,callback,parent
            }
        },
        [],
    )

    /**
     * 
     * @function 更新状态
     * @params key:{string}:对应需要修改的key
     * @params show:{boolean}:是否显示
     * 
     * ****/
    const updateStatus = useCallback(
        (key:string,show:boolean) => {
            let oldStatus:StatusType = JSON.parse(JSON.stringify(status));
            oldStatus[key] = show;
            setStatus(oldStatus);
        },
        [status],
    )

  /***
   * 
   * @function 释放监听元素
   * @params el:{Element}:需要移除的元素，不传则是取消监听器
   * 
   * ****/
   const removeElement = useCallback(
       (el?:Element) => {
        if(el){
            ioRef?.current?.io?.unobserve(el);
        }else{
            ioRef?.current?.io?.disconnect();
            if(ioRef.current && ioRef.current.params)ioRef.current.params.targets = [];
            ioRef.current = null;
        }
       },
       [],
   )

  /****
   * 
   * @function 观察是否出界
   * @params entry:{IntersectionObserverEntryType[]}
   * 
   * *****/
  const entryListener = useCallback(
      (entry:Array<IntersectionObserverEntryType>) => {
        entry.forEach((item: IntersectionObserverEntryType) => {
            let el:UniqueType | null = getElementByKey(ioRef.current?.params?.targets || [],(item.target as any).getAttribute(KEY_NAME));
            if(el){
                item.key = el.key;
                item.parentRect = el.parent?.getBoundingClientRect();
                el?.callback?.(item);
                if(item.intersectionRatio){
                    updateStatus(el.key,true);
                }else{
                    updateStatus(el.key,false);
                }
            }
        });
      },
      [],
  )

  /****
   * 
   * @function 获取所有的ElemntEntry
   * @params find:{string|Element}:需要查找的对象
   * 
   * ****/

  const getIntersectionObserverEntry = useCallback(
      (find?:string | Element):IntersectionObserverEntryType | IntersectionObserverEntryType[] => {
          let targets:IntersectionObserverEntryType[] | undefined = ioRef?.current?.io?.getTargets();
          if(targets && find){
              let index:number = targets.findIndex((item:IntersectionObserverEntryType)=>{
                  return typeof find === 'string'?(item.target as any).getAttribute(KEY_NAME) === find:item.target === find;
              });
              if(index !== -1)return targets[index];
          }
        return targets as IntersectionObserverEntryType[];
      },
      [],
  )

  /*****
   * 
   *@function 从新计算所有元素的位置
   * @params [key:{string}]:可选，根据相应的key进行计算，不传则是所有
   * 
   * *****/
   const recalculateIO = useCallback(
       (key?:string) => {
        if(ioRef.current && ioRef.current?.params?.targets){
            if(key){
                let item:UniqueType | null = getElementByKey(ioRef.current?.params?.targets || [],key);
                if(item){
                    removeElement(item.el);
                    ioRef.current?.io?.observe(item.el); //从新监听
                }else{
                    console.warn('The content of the corresponding key was not found.Please check whether the key is correct.')
                }
                return;
            }
            ioRef.current?.params?.targets.forEach((item:UniqueType)=>{
                removeElement(item.el);
                ioRef.current?.io?.observe(item.el); //从新监听
            });
        }
       },
       [],
   )


  return {
    addElement,
    removeElement,
    getIntersectionObserverEntry,
    recalculateIO,
    status
  };
}

export default useFixed;