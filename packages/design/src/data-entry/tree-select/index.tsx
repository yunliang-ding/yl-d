import { useState, useEffect, useRef } from 'react';
import { Empty, Tree, Layer } from '../..';
import { fieldNamesTransfrom, getLabelByValue } from './util';
import { IconDown, IconClose } from '@yl-d/icon';
import { TreeSelectProps } from './type';
import cloneDeep from 'lodash.clonedeep';
import './index.less';

export default ({
  allowClear = true,
  placeholder = '请选择',
  disabled = false,
  style = {},
  className,
  layerClassName,
  getPopupContainer,
  onChange,
  fieldNames,
  checkable = false,
  ...rest
}: TreeSelectProps) => {
  const selectionRef = useRef<HTMLDivElement>();
  const choiceRef = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  // 获得格式化 options
  const optionsRef = useRef(
    fieldNamesTransfrom(fieldNames, cloneDeep(rest.treeData)),
  );
  // 设置数据源
  const [options, setOptions] = useState(optionsRef.current);
  const [value, setValue] = useState<any>(rest.value); // 内部存选中值容器
  useEffect(() => {
    setValue(rest.value);
  }, [rest.value]);
  const classNames = ['yld-tree-select'];
  if (open) {
    classNames.push('yld-tree-select-open');
  }
  // 是否展示清空按钮
  const showAllowClear = !disabled && allowClear && value?.length > 0;
  if (showAllowClear) {
    classNames.push('yld-tree-select-allowClear');
  }
  if (disabled) {
    classNames.push('yld-tree-select-disabled');
  }
  if (className) {
    classNames.push(className);
  }
  /** 展示选中的 tag */
  const tags = getLabelByValue(value, optionsRef.current);
  const tagRender = Array.isArray(tags)
    ? tags.map((tag) => {
        return (
          <div key={tag.key} className="yld-tree-select-selection-value-tag">
            {tag.title}
            <IconClose
              style={{ fontSize: 12 }}
              onClick={(e: any) => {
                e.stopPropagation(); // 阻止冒泡
                let v = value.filter((i) => i !== tag.key);
                setValue([...v]);
                onChange?.(v);
              }}
            />
          </div>
        );
      })
    : tags;
  // 更新容器的高度
  useEffect(() => {
    if (choiceRef.current && checkable) {
      const { height } = choiceRef.current.getBoundingClientRect();
      selectionRef.current.style.height = height + 8 + 'px';
    } else {
      selectionRef.current.style.height = '32px';
    }
  }, [value]);
  return (
    <div className={classNames.join(' ')} style={style}>
      <div
        ref={selectionRef}
        className="yld-tree-select-selection"
        onClick={() => {
          if (disabled) return;
          setOpen(!open);
        }}
      >
        <div className="yld-tree-select-selection-value">
          {tags === undefined ? (
            <span style={{ color: '#aaa' }}>{placeholder}</span>
          ) : (
            <div
              className="yld-select-selection-choice-warpper"
              ref={choiceRef}
            >
              {tagRender}
            </div>
          )}
        </div>
        <IconDown />
        {showAllowClear && (
          <IconClose
            style={{ fontSize: 12 }}
            onClick={(e: any) => {
              e.stopPropagation(); // 阻止冒泡
              setValue(checkable ? [] : undefined); // 还原
              onChange?.(checkable ? [] : undefined);
              setOpen(false);
              setOptions(
                optionsRef.current.map((item: any) => {
                  return item;
                }),
              );
            }}
          />
        )}
      </div>
      {open && (
        <Layer
          layerClose={() => setOpen(false)}
          domRef={selectionRef}
          layerClassName={layerClassName}
          getPopupContainer={getPopupContainer}
        >
          <div className="yld-tree-select-dropdown">
            {options.length > 0 ? (
              <Tree
                {...rest}
                checkable={checkable}
                selectedKey={value}
                checkedKeys={value}
                treeData={options}
                onSelect={(v) => {
                  setValue(v);
                  onChange(v);
                  setOpen(false);
                }}
                onCheck={(v) => {
                  setValue(v);
                  onChange(v);
                }}
              />
            ) : (
              <Empty label="暂无数据" />
            )}
          </div>
        </Layer>
      )}
    </div>
  );
};
