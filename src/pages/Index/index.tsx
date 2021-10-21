import * as React from "react";
import styles from "./index.module.less";
import CustomLoading from "@/components/RotateLoading";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import getUrlParams from "utils/getUrlParams";
import { StateType } from "models";
import { RootState } from "models/store";
import useCustomTimer from "hooks/useCustomTimer";
import formatTimeToHHMMSS from "utils/formatTimeToHHMMSS";
import useErrorBoundary from "use-error-boundary";
import toast from "@/utils/toast";
import { Button, Field, Rate, Slider } from "react-vant";
import { FormattedMessage } from "react-intl";
import useFixed from "@/hooks/useFixed";

const { memo, useEffect, useState } = React;

let token: string | null = getUrlParams("token"); //获取url中的token

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
  const [time, setTime] = useState(0);
  const { ErrorBoundary } = useErrorBoundary();

  const {
    addElement
  } = useFixed();

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
      
      <div onClick={()=>dispatch?.locale?.setLocale('en')}>更改语言</div>
      <FormattedMessage id="name" values={{name:'1456'}} />
      <Field label="评分">
        <Rate value={5} />
      </Field>
      <Field label="滑块">
        <Slider value={90} />
      </Field>
        <Button block round type="primary">
          提交
        </Button>
      <ErrorBoundary
        render={() => (
          <>
            <Button type="primary" size="mini" loading />
            <CustomLoading
              loading={true}
              showText={true}
              text={data?.toString() + `${formatTimeToHHMMSS(time, "", true)}`}
            />
          </>
        )}
        renderError={() => toast("CustomLoading组件渲染出了问题.")}
      />
    </div>
  );
}

export default memo(Index);
