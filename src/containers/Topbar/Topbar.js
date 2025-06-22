import React from 'react';
import sideBarStore from '@zeep/zustand/app/sidebar';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import TopbarWrapper from './Topbar.styles';
import TopbarUser from './TopbarUser';
const { Header } = Layout;

export default function Topbar() {
  // const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = "defaultTheme";
  const { collapsed, openDrawer, toggleCollapsed } = sideBarStore();
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  const marginLeft = openDrawer ? '20px' : (collapsed ? 0 : '20px');
  
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft" style={{ marginLeft }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            style: { fontSize: "20px" },
            onClick: () => toggleCollapsed(),
          })}
          
        </div>
        <ul className="isoRight">
          <li className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
