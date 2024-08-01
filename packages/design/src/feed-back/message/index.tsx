import { isValidElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import {
  IconClose,
  IconCheckCircleFill,
  IconExclamationCircleFill,
  IconQuestionCircleFill,
  IconCloseCircleFill,
  IconLoading,
} from '@yl-d/icon';
import './index.less';

const $: any = document.querySelector.bind(document);
const $$: any = document.querySelectorAll.bind(document);

const iconMapping = {
  1: <IconCheckCircleFill style={{ color: '#1ac7aa' }} />,
  2: <IconCloseCircleFill style={{ color: '#d81e06' }} />,
  3: <IconExclamationCircleFill style={{ color: '#f4ea2a' }} />,
  4: <IconQuestionCircleFill style={{ color: '#39a9f4' }} />,
  5: <IconLoading style={{ color: 'var(--primary-color)' }} />,
};

export interface MessageProps {
  /** 提示的秒数 */
  duration?: number;
  /** 提示的位置 */
  position?: 'top' | 'bottom';
  /** 显示关闭按钮 */
  closable?: boolean;
  /** 内容 */
  content?: ReactNode;
  /** 自定义icon */
  icon?: ReactNode;
}

export default () => {
  const open = (type: number, option: ReactNode | MessageProps) => {
    const defaultOption: MessageProps = {
      position: 'top',
      duration: 3,
      closable: false,
    };
    if (
      typeof option === 'object' &&
      option !== null &&
      !isValidElement(option)
    ) {
      Object.assign(defaultOption, option);
    } else {
      defaultOption.content = option;
    }
    let messageContainer = document.createElement('div');
    let length = $$('.yld-message').length;
    messageContainer.className = 'yld-message';
    if (defaultOption.position === 'bottom') {
      messageContainer.style.left = 'auto';
      messageContainer.style.top = 'auto';
      messageContainer.style.bottom = 50 + length * 60 + 'px';
      messageContainer.style.right = '20px';
    } else {
      messageContainer.style.top = 50 + length * 60 + 'px';
      messageContainer.style.top = 50 + length * 60 + 'px';
    }
    $('body').appendChild(messageContainer);
    setTimeout(() => {
      if (defaultOption.closable === false && type !== 5) {
        messageContainer.remove();
      }
    }, defaultOption.duration * 1000);
    ReactDOM.render(renderMessage(type, defaultOption), messageContainer);
    // 返回关闭的钩子
    return () => messageContainer.remove();
  };
  const renderMessage = (type: number, option: MessageProps) => {
    return (
      <div
        className="yld-message-content"
        style={{ paddingRight: option.closable ? 20 : 0 }}
      >
        {option.icon ? option.icon : iconMapping[type]}
        <div className="yld-message-content-message">{option.content}</div>
        {option.closable && (
          <IconClose
            style={{ fontSize: 14 }}
            onClick={(e: any) => {
              e.target.parentNode.parentNode.remove();
            }}
          />
        )}
      </div>
    );
  };
  return {
    success: (option: ReactNode | MessageProps): Function => {
      return open(1, option);
    },
    error: (option: ReactNode | MessageProps): Function => {
      return open(2, option);
    },
    warning: (option: ReactNode | MessageProps): Function => {
      return open(3, option);
    },
    normal: (option: ReactNode | MessageProps): Function => {
      return open(4, option);
    },
    loading: (option: ReactNode | MessageProps): Function => {
      return open(5, option);
    },
  };
};
