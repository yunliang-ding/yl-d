import { Menu, Breadcrumb } from '../../..';
import RightContentRender from '../right-content-render';
import './inline.less';

export default ({
  menus,
  menuClick,
  title,
  pageTitle,
  logo,
  extra,
  rightContentProps,
  openKeys,
  selectedKey,
  collapsed,
  dark,
  footerRender,
  siderFooterRender,
  content,
  breadcrumb,
}: any) => {
  /** 右侧渲染逻辑 */
  return (
    <>
      <div className="yld-layout-inline-header">
        <div className="yld-layout-inline-header-logo">
          <a>
            <img
              src={logo}
              style={{
                width: 32,
                height: 32,
              }}
            />
            <h1>{title}</h1>
          </a>
        </div>
        <div className="yld-layout-inline-header-menu">
          <Breadcrumb items={breadcrumb} />
        </div>
        <div className="yld-layout-inline-header-right">
          <RightContentRender
            {...{
              dark,
              ...rightContentProps,
            }}
          />
        </div>
      </div>
      <div className="yld-layout-inline-body">
        <div className="yld-layout-inline-body-sider">
          <div className="yld-layout-inline-body-sider-menu">
            {/* 这里渲染当前一级菜单下面的子菜单 */}
            <Menu
              menuClick={menuClick}
              selectKey={selectedKey}
              openKey={openKeys}
              menus={menus}
            />
          </div>
          <div className="yld-layout-inline-body-sider-footer">
            {siderFooterRender(collapsed)}
          </div>
        </div>
        <div className="yld-layout-inline-body-right">
          <div className="yld-layout-inline-body-right-title">
            <h3>{pageTitle}</h3>
            <div className="yld-layout-vertical-right-body-title-extra">
              {extra}
            </div>
          </div>
          <div className="yld-layout-inline-body-right-content">{content}</div>
          <div className="yld-layout-inline-body-right-footer">
            {footerRender()}
          </div>
        </div>
      </div>
    </>
  );
};