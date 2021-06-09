import * as React from "react";

type IrregularBorderType = {
  width: number; //边框宽度
  color: string; //边框颜色
  opacity: number; //边框透明度
  style: any; //其余样式
};

interface ChildrenType {
  children?: React.ReactNode; //子元素
}

type IBType = Partial<IrregularBorderType> & ChildrenType;

/****
 *
 * @method 生成任意角度的边框
 * @param PropsType:{IBType}
 *
 * ****/

const IrregularBorder: React.FC<IBType> = ({
  children,
  width = 1,
  color = "#fff",
  opacity = 1,
  style,
}: IBType) => {
  return (
    <>
      <div style={{ ...style, filter: `url(#border)` }}>{children}</div>
      <svg width="0" height="0">
        <filter id="border">
          <feMorphology
            in="SourceAlpha"
            result="DILATED"
            operator="dilate"
            radius={width}
          ></feMorphology>
          <feFlood
            flood-color={color}
            flood-opacity={opacity}
            result="flood"
          ></feFlood>
          <feComposite
            in="flood"
            in2="DILATED"
            operator="in"
            result="OUTLINE"
          ></feComposite>
          <feMerge>
            <feMergeNode in="OUTLINE" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
    </>
  );
};

export default React.memo(IrregularBorder);
