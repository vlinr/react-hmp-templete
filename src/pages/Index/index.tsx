import * as React from "react";
import styles from "./index.module.less";
import CustomLoading from "@/components/CustomLoading";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import getUrlParams from "@/utils/getUrlParems";
import { StateType } from "@/models";
import { RootState } from "@/models/store";
import useCustomTimer from "@/hooks/useCustomTimer";
import formatTimeToHHMMSS from "@/utils/formatTimeToHHMMSS";
// import toast from "@/utils/toast";
const { memo, useEffect, useState } = React;

let token: string | null = getUrlParams("token"); //获取url中的token

//缓存一层
const indexReducer = createSelector(
  (state: RootState) => state.index,
  (index: StateType) => index.info
);

/******
 *
 * method:首页
 *
 * *******/
function Index(): React.ReactElement<any> {
  const dispatch = useDispatch();
  const data = useSelector(indexReducer); //数据仓库
  const { startTimer, cancelTimer } = useCustomTimer(false, 99999);
  // const history = useHistory();
  // console.log(history);
  const [time, setTime] = useState(0);
  //初始化数据
  useEffect(() => {
    //获取活动详情
    dispatch?.index?.getInfo({
      token,
      callback(res: any) {},
    });
    // toast("通用提示", {
    //   position: "top",
    //   keepTime: 3000,
    // });
    startTimer?.(time, (num: number) => {
      setTime(num);
      // if (num % 5 === 0) {
      //   //取5等于0的时候暂停5秒继续执行次
      //   pauseTimer();
      //   setTimeout(() => {
      //     resumeTimer();
      //   }, 1000);
      // }
    });
    () => cancelTimer?.();
  }, []);
  return (
    <div className={styles.box}>
      <CustomLoading
        loading={true}
        showText={true}
        text={data?.toString() + `${formatTimeToHHMMSS(time, "", true)}`}
      />
    </div>
  );
}

export default memo(Index);
