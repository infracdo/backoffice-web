import React from 'react';
import Popover from '@zeep/components/uielements/popover';
import { Row } from 'antd'
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import authStore from '@zeep/zustand/auth/';
import userpic from '@zeep/assets/images/user1.png';


export default function TopbarUser() {
  const { logoutRequest} = authStore();
  const [visible, setVisibility] = React.useState(false);
  const user = JSON.parse( localStorage.getItem('user') );


  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <div className="isoDropdownLink" onClick={() => logoutRequest()}>
        <i className="ion-log-out" style={{paddingRight:'5px'}}/>  
        Logout
      </div>
      <a className="isoDropdownLink" href="/change-password">
        <i className="ion-locked" style={{paddingRight:'5px'}}/>  
          Change Password
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      onOpenChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <Row>
        <p>{user?.name}</p>
        <div className="isoImgWrapper">
          <img alt="user" src={userpic} /> 
          <span className="userActivity online" />
        </div>
      </Row>
    </Popover>
  );
}
