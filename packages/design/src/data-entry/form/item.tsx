import { useEffect, useRef, useState } from 'react';
import mapping from './mapping';
import Error from './error';
import { isEmpty } from '../../tools';

export default ({
  descriptorRef,
  itemRef,
  value,
  onChange,
  form,
  item,
  column,
  disabled,
  horizontal,
}) => {
  const [_item, setItem] = useState(item);
  useEffect(() => {
    setItem(item);
  }, [item]);
  const {
    label,
    required,
    name,
    type,
    style = {},
    span = 1,
    props,
    visible,
    className,
    labelWidth,
  } = _item;
  const labelRef = useRef<HTMLLabelElement>();
  const wrapRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (labelRef.current && horizontal) {
      const { width } = labelRef.current.getBoundingClientRect();
      wrapRef.current.style.width = `calc(100% - ${width + 10}px)`;
    }
  }, [label]);
  const [, setRefresh] = useState(Math.random());
  const [_value, setValue] = useState(value);
  const [_disabled, setDisabled] = useState(disabled);
  useEffect(() => {
    setDisabled(disabled);
  }, [disabled]);
  const [error, setError] = useState(false);
  const Comp =
    typeof type === 'function' ? type : mapping[type] || <Error type={type} />;
  // 生成校验规则
  if (required) {
    descriptorRef.current[name] = {
      type: 'string',
      required: true,
      message: `${label}不能为空`,
      validator: (rule, value) => !isEmpty(value),
    };
  }
  useEffect(() => {
    // 展示报错信息
    Object.assign(itemRef, {
      showError(error) {
        setError(error);
      },
      clearError() {
        setError(false);
      },
      setValue,
      setDisabled,
      reload: () => {
        setRefresh(Math.random());
      },
      setItem: (item) => {
        // 做一个合并操作, 之后重新渲染
        setItem({
          ..._item,
          ...item,
        });
      },
    });
  }, []);
  if (typeof visible === 'function' && visible(form) === false) {
    return null;
  }
  const classNames = ['yld-form-item'];
  if (className) {
    classNames.push(className);
  }
  if (required) {
    classNames.push('yld-form-item-required');
  }
  if (error) {
    classNames.push('yld-form-item-error');
  }
  return (
    <div
      className={classNames.join(' ')}
      style={{
        gridColumnStart: `span ${span === 'fill' ? column : span}`,
        ...style,
      }}
    >
      {label && (
        <label ref={labelRef} style={labelWidth ? { width: labelWidth } : {}}>
          {label}
        </label>
      )}
      <div className="yld-form-item-wrap" ref={wrapRef}>
        <Comp
          disabled={_disabled}
          {...props}
          /** 注入属性 value 和 onChange */
          value={_value}
          onChange={onChange}
        />
        {error && <div className="yld-form-item-error-message">{error}</div>}
      </div>
    </div>
  );
};