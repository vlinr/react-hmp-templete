/******
 * 
 * 全局头配置文件
 * 
 * ****/
import createUUID from "@/utils/createUUID";
import { USER_TOKEN_NAME } from "./config";
const HEADER = ()=>{
    return {
        'Authorization':'Bearer '+(localStorage.getItem(USER_TOKEN_NAME) || null), 
        'APP-NAME':'',
        'APP-ID':'',  //jjgbd2g3cz5k6pcfkx 线上 jjgbd2g3cz5k6pcfky 测试
        'APP-VERSION':'',
        'APP-VERSION-NUM':'',
        'APP-LEVEL':1,                                
        'SOURCE-APP-NAME':'',                       //源APP-NAME,主要是配合Authorization代理验证
        'APP-DEVICE-UUID':'',                         //应用设备唯一ID,应用安装在当前设备下的唯一标识，若个别设备无法获取设备唯一ID，可以自己用户和设备进行唯一生成储存【string小写】,示例：8e2e78d2-9139-4f10-a7e5-d6626af8fa6d
        'APP-DEVICE-MANUFACTURER':'',                 //应用设备制造商【string小写】，示例：apple （web传浏览器相关数据）
        'APP-DEVICE-TYPE':'',                        //应用设备系统类型【string小写】，示例：ios，android，windows,mac,ipad,... （web传浏览器相关数据）
        'APP-DEVICE-MODEL':'' ,                        //应用设备型号【string小写】，示例：iphone6
        'APP-DEVICE-VERSION':'' ,                      //应用设备系统版本【string】,示例：12.0.3
        'APP-DEVICE-VERSION-NUM':'',                 //应用设备系统版本数字化【int】,示例：120003 (三位版本号，每位算2位数字，非首位版本不足两位数用0填充，如：1.12.35=11235，2.4.12=20412)
        'APP-UA':'',                              //屏幕信息
        'JJG-TRACEID':createUUID(),                          //请求(日志)唯一ID数据保证唯一，用户日志收集链路跟踪【string小写】，示例：8e2e78d2-9139-4f10-a7e5-d6626af8fa6d
        'JJG-NETWORK':'wifi',                           //网络模式【string小写】,示例：wifi,3g,4g,5g,...
        'JJG-USER-ID':JSON?.parse?.(localStorage.getItem(USER_TOKEN_NAME) || '{}')?.id || '',                           //节节高用户ID【string】,未登录用户为0，示例：1922924
        'TIMESTAMP':new Date().getTime()                               //【string毫秒】,请求时间戳，示例：1597819754574
    }
}
// Authorization                            #认证token  
// APP-NAME                                 #应用名称【string小写】示例：jjg_miniprogram
// APP-ID                                   #应用id示例：3
// APP-VERSION                              #应用版本【string】示例：1.0.0
// APP-VERSION-NUM                          #应用版本数值【int】30100(三位版本号，每位算2位数字，非首位版本不足两位数用0填充，如：1.12.35=11235，2.4.12=20412)
// APP-LEVEL                                #层级计数器
// SOURCE-APP-NAME                          #源APP-NAME,主要是配合Authorization代理验证
// APP-DEVICE-UUID                          #应用设备唯一ID,应用安装在当前设备下的唯一标识，若个别设备无法获取设备唯一ID，可以自己用户和设备进行唯一生成储存【string小写】,示例：8e2e78d2-9139-4f10-a7e5-d6626af8fa6d
// APP-DEVICE-MANUFACTURER                  #应用设备制造商【string小写】，示例：apple （web传浏览器相关数据）
// APP-DEVICE-TYPE                          #应用设备系统类型【string小写】，示例：ios，android，windows,mac,ipad,... （web传浏览器相关数据）
// APP-DEVICE-MODEL                         #应用设备型号【string小写】，示例：iphone6
// APP-DEVICE-VERSION                       #应用设备系统版本【string】,示例：12.0.3
// APP-DEVICE-VERSION-NUM                   #应用设备系统版本数字化【int】,示例：120003 (三位版本号，每位算2位数字，非首位版本不足两位数用0填充，如：1.12.35=11235，2.4.12=20412)
// APP-UA                                   #屏幕信息
// JJG-TRACEID                              #请求(日志)唯一ID数据保证唯一，用户日志收集链路跟踪【string小写】，示例：8e2e78d2-9139-4f10-a7e5-d6626af8fa6d
// JJG-NETWORK                              #网络模式【string小写】,示例：wifi,3g,4g,5g,...
// JJG-USER-ID                              #节节高用户ID【string】,未登录用户为0，示例：1922924
// TIMESTAMP                                #【string毫秒】,请求时间戳，示例：1597819754574

export default HEADER;