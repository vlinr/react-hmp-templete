
//获取存储得清晰度配置
 const getLocalDefinition = (defaultValue:any) =>{
    let def: any = localStorage.getItem("DEFINITION_STATE");
    if (def) {
      return JSON.parse?.(def);
    }
    //默认返回高清
    return defaultValue;
  }
export default getLocalDefinition;