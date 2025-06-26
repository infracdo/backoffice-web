import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import Input from '@zeep/components/uielements/input';
import Button from '@zeep/components/uielements/button';
import IntlMessages from '@zeep/components/utility/intlMessages';
import authStore from '@zeep/zustand/auth/';
import ForgotPasswordStyleWrapper from './ForgotPassword.styles';
import Logo from '@zeep/assets/images/logo-short-light.svg';


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { loading, forgotPasswordRequest } = authStore();
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (loading) {
      return
    }
    forgotPasswordRequest({
      email,
      user_type: "backoffice_user"
    });
  }
  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <img alt="#" src={Logo}/>
                <h1>FORGOT PASSWORD</h1>
              </Link>
          </div>
          <div className="isoFormHeadText">
            <p>
              <IntlMessages id="page.forgetPassDescription" />
            </p>
          </div>

          <div className="isoForgotPassForm">
            <div className="isoInputWrapper">
              <Input 
                  prefix={<MailOutlined className="icon" />}
                  size="large" placeholder="Email"  onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="isoInputWrapper extraPadTop">
              <Button type="primary" onClick={handleResetPassword} disabled={email? false : true} loading={loading}>
                  <IntlMessages id="page.sendRequest" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}
