import { CSSProperties, ReactNode } from "react";

export interface BreadcrumbProps{
  /** 分隔符 */
  separator?: ReactNode;
  maxCount?: number;
  /** 样式 */
  style?: CSSProperties;
  /** 点击事件 */
  onClick?: Function;
  /** 数据源 */
  items: {
    title: string,
    href?: string,
  }[],
}

export default (props: BreadcrumbProps) => null;