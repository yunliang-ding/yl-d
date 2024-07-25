import {
  useState,
  useEffect,
  useRef,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Button, Icon, Input, Layer } from '../../index';

export interface TimePickerProps {
  /** 类名 */
  className?: string;
  /** 值 */
  value?: string;
  /** 是否清空 */
  allowClear?: boolean;
  /** 提示语 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 样式 */
  style?: CSSProperties;
  /** 改变钩子 */
  onChange?: Function;
  /** 下拉菜单的类名 */
  layerClassName?: string;
  /** 挂载的容器 */
  getPopupContainer?: () => HTMLElement;
}

const timeList: any = [
  Object.keys(new Array(24).fill('')).map((item: any) => {
    return {
      key: Math.random(),
      label: item.padStart(2, 0),
      value: item.padStart(2, 0),
    };
  }),
  Object.keys(new Array(60).fill('')).map((item: any) => {
    return {
      key: Math.random(),
      label: item.padStart(2, 0),
      value: item.padStart(2, 0),
    };
  }),
  Object.keys(new Array(60).fill('')).map((item: any) => {
    return {
      key: Math.random(),
      label: item.padStart(2, 0),
      value: item.padStart(2, 0),
    };
  }),
];

// export default ({
//   onChange,
//   allowClear = true,
//   placeholder,
//   disabled = false,
//   style = {},
//   layerClassName,
//   getPopupContainer,
//   value,
// }: TimePickerProps) => {
//   /**
//    * 数据转化 转为2维数组渲染
//    */
//   const [open, setOpen] = useState(false);
//   const [times, setTimes] = useState(value ? value.split(':') : []); // 内部存选中值容器
//   /**
//    * value Change
//    */
//   useEffect(() => {
//     setTimes(value ? value.split(':') : []);
//   }, [value]);
//   const classNames = ['yld-time-picker'];
//   if (disabled) {
//     classNames.push('yld-time-picker-disabled');
//   }
//   const selectionRef = useRef<HTMLDivElement>();
//   return (
//     <div className={classNames.join(' ')} style={style}>
//       <div className="yld-time-picker-input" ref={selectionRef}>
//         <Input
//           suffix={<Icon type="time" />}
//           disabled={disabled}
//           placeholder={placeholder}
//           value={times.join(':')}
//           readOnly
//           showCount={false}
//           allowClear={allowClear && times.length > 0}
//           onAllowClear={() => {
//             onChange?.(undefined);
//           }}
//           onClick={(e: any) => {
//             if (open) {
//               e.stopPropagation();
//             }
//             setOpen(true);
//           }}
//         />
//       </div>
//       {open && (
//         <Layer
//           open={open}
//           layerClose={() => {
//             setTimes(value.split(':'));
//             setOpen(false);
//           }}
//           layerClassName={layerClassName}
//           getPopupContainer={getPopupContainer}
//           domRef={selectionRef}
//           layerWidth="fix-content"
//           content={}
//         />
//       )}
//     </div>
//   );
// };

const TimePicker = forwardRef(
  (
    {
      onChange,
      allowClear = true,
      placeholder,
      disabled = false,
      style = {},
      selectionRef,
      value,
      open,
      setOpen,
    }: any,
    ref,
  ) => {
    /**
     * 数据转化 转为2维数组渲染
     */
    const [times, setTimes] = useState(value ? value.split(':') : []); // 内部存选中值容器
    useEffect(() => {
      setTimes(value ? value.split(':') : []);
    }, [value]);
    useImperativeHandle(ref, () => {
      return {
        times,
        setTimes,
      };
    });
    const classNames = ['yld-time-picker'];
    if (disabled) {
      classNames.push('yld-time-picker-disabled');
    }
    return (
      <div className={classNames.join(' ')} style={style}>
        <div className="yld-time-picker-input" ref={selectionRef}>
          <Input
            suffix={<Icon type="time" />}
            disabled={disabled}
            placeholder={placeholder}
            value={times.join(':')}
            readOnly
            showCount={false}
            allowClear={allowClear && times.length > 0}
            onAllowClear={() => {
              onChange?.(undefined);
            }}
            onClick={(e: any) => {
              if (open) {
                e.stopPropagation();
              }
              setOpen(true);
            }}
          />
        </div>
      </div>
    );
  },
);

const Content = ({
  disabled,
  onChange,
  setOpen,
  timePickerRef,
  value,
}: any) => {
  const [times, setTimes] = useState([]);
  useEffect(() => {
    setTimes(value ? value.split(':') : []);
  }, [value]);
  return (
    <div className="yld-time-picker-dropdown">
      <div className="yld-time-picker-dropdown-box">
        {timeList.map((item: any, index: number) => {
          return (
            <div className="yld-time-picker-dropdown-col" key={index}>
              {item.map((option: any, _index: number) => {
                let selelcted = false;
                if (times[index] === undefined) {
                  selelcted = _index === 0;
                } else {
                  selelcted = times[index] === option.value;
                }
                const className = ['yld-time-picker-dropdown-menu'];
                if (selelcted) {
                  className.push('yld-time-picker-dropdown-menu-selected');
                }
                if (disabled) {
                  className.push('yld-time-picker-dropdown-menu-disabled');
                }
                return (
                  <div
                    key={option.key}
                    className={className.join(' ')}
                    onClick={() => {
                      if (option.disabled) return;
                      for (let i = 0; i < timeList.length; i++) {
                        if (i === index) {
                          times[i] = option.value;
                        } else if (times[i] === undefined) {
                          times[i] = '00';
                        }
                      }
                      setTimes([...times]);
                      timePickerRef.current.setTimes([...times]);
                    }}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="yld-time-picker-dropdown-footer">
        <Button type="link">此刻</Button>
        <Button
          type="link"
          onClick={() => {
            onChange(times.join(':'));
            setOpen(false);
          }}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

export default ({
  value,
  onChange,
  layerClassName,
  getPopupContainer,
  ...rest
}: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  const selectionRef = useRef<HTMLDivElement>();
  const timePickerRef = useRef<{
    setTimes: Function;
    times: string;
  }>();
  return (
    <>
      <TimePicker
        ref={timePickerRef}
        selectionRef={selectionRef}
        setOpen={setOpen}
        value={value}
        onChange={onChange}
        open={open}
        {...rest}
      />
      {open && (
        <Layer
          layerClose={() => {
            timePickerRef.current.setTimes(value.split(':'));
            setOpen(false);
          }}
          layerClassName={layerClassName}
          getPopupContainer={getPopupContainer}
          domRef={selectionRef}
          layerWidth="fix-content"
        >
          <Content
            timePickerRef={timePickerRef}
            value={value}
            onChange={onChange}
            setOpen={setOpen}
            {...rest}
          />
        </Layer>
      )}
    </>
  );
};
