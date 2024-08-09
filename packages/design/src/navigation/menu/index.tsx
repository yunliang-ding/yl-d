import { useState, useEffect } from 'react';
import { Avatar } from '../../..';
import { MenuProps } from './type';
import './index.less';

export default ({
  menus,
  menuClick,
  style,
  collapsed,
  collapsedWidth = 48,
  ...rest
}: MenuProps) => {
  const [openKey, setOpenKey] = useState(rest.openKey || []);
  const [selectKey, setSelectKey] = useState(rest.selectKey);
  useEffect(() => {
    if (rest.selectKey !== selectKey) {
      setSelectKey(rest.selectKey);
    }
  }, [rest.selectKey]);
  useEffect(() => {
    if (Array.isArray(rest.openKey)) {
      setOpenKey(rest.openKey);
    }
  }, [rest.openKey]);
  const isSelected = (menus) => {
    // 判断是否有子节点选中
    return menus.some((item) => {
      if (selectKey == item.path) {
        return true;
      } else if (item.children) {
        return isSelected(item.children);
      }
    });
  };
  const renderNav = (item, labelClassName, paddingLeft) => {
    return (
      <>
        <div className={labelClassName.join(' ')} style={{ paddingLeft }}>
          {item.icon}
          <span>{item.label}</span>
        </div>
        {Array.isArray(item.children) && (
          <div
            className={
              !openKey.includes(item.path)
                ? 'yld-menu-vertical-subMenu-hidden'
                : ''
            }
          >
            {renderMenus(item.children, paddingLeft + 24)}
          </div>
        )}
      </>
    );
  };
  const renderCollapsedNav = (item, labelClassName) => {
    return (
      <div className={labelClassName.join(' ')}>
        {item.icon ? item.icon : item.label.substr(0, 1)}
      </div>
    );
  };
  const onClick = (item) => {
    if (item.disabled) return;
    let itemKey = selectKey;
    if (item.children) {
      if (openKey.includes(item.path)) {
        // 删除
        openKey.splice(
          openKey.findIndex((key) => key === item.path),
          1,
        );
      } else {
        openKey.push(item.path);
      }
      setOpenKey([...openKey]);
    } else {
      itemKey = item.path;
      setSelectKey(item.path);
    }
    menuClick?.(openKey, itemKey);
  };
  const renderMenus = (menus, paddingLeft) => {
    return menus.map((item) => {
      let className = ['yld-menu-vertical-subMenu'];
      /** className */
      if (item.children && isSelected(item.children)) {
        className.push('yld-menu-vertical-subMenu-selected');
      }
      if (selectKey == item.path) {
        className.push('yld-menu-vertical-subMenu-active');
      }
      if (item.disabled) {
        className.push('yld-menu-vertical-subMenu-disabled');
      }
      /** labelClassName */
      let labelClassName = ['yld-menu-vertical-subMenu-label'];
      if (openKey.includes(item.path)) {
        labelClassName.push('yld-menu-vertical-subMenu-label-open');
      }
      if (item.children) {
        labelClassName.push('yld-menu-vertical-subMenu-parent');
      }
      if (collapsed) {
        labelClassName.push('yld-menu-vertical-subMenu-collapsed');
      }
      return (
        <div
          key={item.path}
          className={className.join(' ')}
          onClick={(e) => {
            e.stopPropagation(); // 阻止冒泡
            onClick(item);
          }}
        >
          {collapsed
            ? renderCollapsedNav(item, labelClassName)
            : renderNav(item, labelClassName, paddingLeft)}
        </div>
      );
    });
  };
  const className = ['yld-menu-vertical'];
  if (collapsed) {
    className.push('yld-menu-vertical-collapsed');
  }
  return (
    <div
      className={className.join(' ')}
      style={{
        ...style,
        width: collapsed ? collapsedWidth : style ? style.width : '100%',
      }}
    >
      {renderMenus(menus, 20)}
    </div>
  );
};
