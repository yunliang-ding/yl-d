import { CSSProperties, ReactNode, useState } from 'react';
import { Icon } from '../../index';

export interface ButtonProps {
  /** 类型 */
  type?: 'primary' | 'link' | 'dashed' | 'danger';
  /** 是否禁用 */
  disabled?: Boolean;
  /** 幽灵按钮 */
  ghost?: Boolean;
  /** 点击事件 */
  onClick?: Function;
  /** 图标 */
  icon?: String;
  /** 样式 */
  style?: CSSProperties;
  /** 二次确认提示 */
  confirm?: {
    title?: String;
    content: ReactNode;
  };
  /** 类名 */
  className?: string;
  children?: ReactNode;
}

export default ({
  disabled,
  ghost,
  onClick,
  icon,
  type,
  style,
  className,
  children,
}: ButtonProps) => {
  const classNames = ['yld-btn'];
  const [loading, setLoading] = useState(false);
  if (className) {
    classNames.push(className);
  }
  if (type) {
    classNames.push('yld-btn-' + type);
  }
  if (ghost) {
    classNames.push('yld-btn-ghost');
  }
  if (disabled) {
    classNames.push('yld-btn-disabled');
  }
  if (loading) {
    classNames.push('yld-btn-loading');
  }
  return (
    <button
      style={style}
      className={classNames.join(' ')}
      onClick={async (e: any) => {
        if (disabled) return;
        setLoading(true);
        try {
          typeof onClick === 'function' && (await onClick(e));
        } catch (error) {
          console.error('按钮点击异常:', error);
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading && <Icon type="loading" size={12} />}
      {icon && <Icon type={icon} />}
      {children || ''}
    </button>
  );
};
