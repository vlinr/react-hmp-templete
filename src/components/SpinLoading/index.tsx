import * as React from "react";
import RotateLoading from "@/components/RotateLoading";
import styles from "./index.module.less";
const { memo } = React;
interface LoadingType {
  error?: any; //加载错误
  pastDelay: boolean;
  mask?: boolean;
  isFullScreen?: boolean;
}

const SpinLoading = ({
  error,
  pastDelay,
  mask,
  isFullScreen,
}: LoadingType): React.ReactElement | null => {
  if (error) return <div>加载错误...</div>;
  if (pastDelay)
    return (
      <div
        style={{ textAlign: "center" }}
        className={`${isFullScreen && styles.fullscreen} ${
          mask && styles.mask
        }`}
      >
        <RotateLoading loading />
      </div>
    );
  return null;
};

export default memo(SpinLoading);
