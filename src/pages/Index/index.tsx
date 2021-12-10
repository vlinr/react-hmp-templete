import * as React from 'react'
import styles from './index.module.less'
import CustomLoading from '@/components/RotateLoading'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import getUrlParams from 'utils/getUrlParams'
import { StateType } from 'models'
import { RootState } from 'models/store'
import useCustomTimer from 'hooks/useCustomTimer'
import useErrorBoundary from 'use-error-boundary'
import toast from '@/utils/toast'
import formatDate from '@/utils/formatDate'
import useLocale from '@/hooks/useLocale'
const { memo, useEffect, useState } = React

let token: string | null = getUrlParams('token') //获取url中的token

const indexReducer = createSelector(
  (state: RootState) => state.index,
  (index: StateType) => index.info,
)

/******
 *
 * @function:首页
 *
 * *******/
function Index(): React.ReactElement<any> {
  const dispatch = useDispatch()
  const data = useSelector(indexReducer) //数据仓库
  const { startTimer, cancelTimer } = useCustomTimer(false, 99999)
  const [time, setTime] = useState(0)
  const { ErrorBoundary } = useErrorBoundary()

  //初始化数据
  useEffect(() => {
    dispatch?.index?.getInfo({
      token,
      callback(res: any) {},
    })

    // toast("通用提示，中部", {
    //   position: "center",
    //   keepTime: 3000,
    //   style: {
    //     backgroundColor: "rgba(0,0,0,.6)",
    //     color: "#fff",
    //   },
    // });
    // setTimeout(() => {
    //   toast("通用提示，中部更改内容", {
    //     position: "center",
    //     keepTime: 3000,
    //   });
    // }, 1000);
    // toast("通用提示,顶部", {
    //   position: "top",
    //   keepTime: 3000,
    // });
    // toast("通用提示,默认底部");
    // other code
    startTimer?.(time, (num: number) => {
      setTime(num)
      // if (num % 5 === 0) {
      //   //取5等于0的时候暂停5秒继续执行次
      //   pauseTimer();
      //   setTimeout(() => {
      //     resumeTimer();
      //   }, 1000);
      // }
    })
    return () => cancelTimer?.()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.box}`}>
      <div
        onClick={() => dispatch?.locale?.setLocale('en')}
        style={{ cursor: 'pointer' }}
      >
        更改语言
      </div>
      {useLocale('name')}
      <ErrorBoundary
        render={() => (
          <CustomLoading
            loading={true}
            showText={true}
            text={data?.toString() + `${formatDate(time, 'HH:mm:ss', true)}`}
          />
        )}
        renderError={(error: any) => toast('CustomLoading组件渲染出了问题.')}
      />
    </div>
  )
}

export default memo(Index)
