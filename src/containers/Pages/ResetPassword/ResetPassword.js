import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { Button, Input } from 'antd';
import IntlMessages from '@zeep/components/utility/intlMessages';
import ResetPasswordStyleWrapper from './ResetPassword.styles';
import sideBarStore from '@zeep/zustand/app/sidebar';
import authStore from '@zeep/zustand/auth/';
import Logo from '@zeep/assets/images/logo-short-light.svg';


const initialState = {
  old_password: "",
  new_password: "",
  retype_pasword: "",
}

export default function() {
  const [passwords, setPasswords] = useState({ ...initialState })
  const { loading, resetPasswordRequest} = authStore();
  const { clearMenu } = sideBarStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return
    }
    const user = JSON.parse( localStorage.getItem('user') );
    if (passwords.new_password === passwords.retype_pasword){
      let params = {
        old_password: passwords.old_password,
        new_password: passwords.new_password,
        user_id: user.id
      }
      resetPasswordRequest(params);
      clearMenu();
    } else {
      notification['error']({
        message: 'Change Password',
        description: 'Password did not match!'
      });
    }
    
  }

  const handleChange = (event, field) => {
    let value = event.target.value;
    passwords[field] = value;
    setPasswords(prev=>({
      ...prev,
      ...passwords
    }))
  }

  const handleKeyDown = event => {
    if (event.keyCode === 13 && passwords.old_password && passwords.new_password && passwords.retype_pasword) {
      handleSubmit(event);
    }
  }

  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
                <Link to="/dashboard">
                  <img alt="#" src={Logo}/>
                </Link>
                <h1>Change Password</h1>
          </div>
          <div className="isoFormHeadText">
            <p>
              <IntlMessages id="page.resetPassDescription" />
            </p>
          </div>

          <div className="isoResetPassForm">
          <div className="isoInputWrapper">
            <Input.Password
              size="large"
              type="password"
              placeholder="Old Password"
              onChange={(value) => handleChange(value, "old_password")}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="isoInputWrapper">
          <Input.Password
              size="large"
              type="password"
              placeholder="New Password"
              onChange={(value) => handleChange(value, "new_password")}
              onKeyDown={handleKeyDown}
            />            
          </div>
          <div className="isoInputWrapper">
            <Input.Password
              size="large"
              type="password"
              placeholder="Retype Password"
              onChange={(value) => handleChange(value, "retype_pasword")}
              onKeyDown={handleKeyDown}
            />
          </div>
            <div className="isoInputWrapper extraPadTop">
              <Button type="primary" onClick={handleSubmit} 
                disabled={!passwords.old_password || !passwords.new_password || !passwords.retype_pasword} 
                loading={loading}
                >
                {loading? "Updating": "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  );
}
