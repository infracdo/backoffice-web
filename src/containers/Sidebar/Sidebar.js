import React, { useEffect } from 'react';
import sideBarStore from '@zeep/zustand/app/sidebar';
import { Layout } from 'antd';
import options from './options';
import Scrollbars from '@zeep/components/utility/customScrollBar';
import Menu from '@zeep/components/uielements/menu';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
import Logo from "@zeep/components/utility/logo";

const { Sider } = Layout;

export default function Sidebar() {
  const {
    toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed,
    view, openKeys, collapsed, openDrawer, current, height
  } = sideBarStore()
  const customizedTheme = "defualtTheme";

  useEffect(() => {
    const active_menu = localStorage.getItem('activeMenu');
    if(!active_menu || current[0] === 'sign'){
      changeCurrent(['dashboard']);
    }else{
      changeCurrent([active_menu]);
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleClick(e) {
    changeCurrent([e.key]);
    if (view === 'MobileView') {
      setTimeout(() => {
        toggleCollapsed();
      }, 100);

      // clearTimeout(timer);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      (key) => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  const getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      toggleOpenDrawer();
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      toggleOpenDrawer();
    }
    return;
  };
  const styling = {
    backgroundColor: customizedTheme.backgroundColor,
  };
  const submenuStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };
  const user = JSON.parse( localStorage.getItem('user') );
  const user_role = user['user_type'];
  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={200}
        className='isomorphicSidebar'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: height - 70 }}>
          <Menu
            onClick={handleClick}
            theme='dark'
            className='isoDashboardMenu'
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
          >
            {options.map((singleOption) => (
              singleOption.roles.includes(user_role)?
              <SidebarMenu
                key={singleOption.key}
                submenuStyle={submenuStyle}
                submenuColor={submenuColor}
                singleOption={singleOption}
              />
              :null
            ))}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
