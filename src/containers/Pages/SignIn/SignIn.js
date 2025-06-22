import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Button, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import sideBarStore from '@zeep/zustand/app/sidebar';
import authStore from '@zeep/zustand/auth/';
import SignInStyleWrapper from './SignIn.styles';
import Logo from '@zeep/assets/images/login_image.png';


const initialState = {
  email: "",
  password: "",
}
export default function SignIn() {
  const [credential, setCredential] = useState({ ...initialState })
  const { loading, loginRequest, isAuthenticated, checkAuthorization } = authStore();
  const { clearMenu } = sideBarStore();
  let location = useLocation();
  const isLoggedIn = isAuthenticated;
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  React.useEffect(() => {
    checkAuthorization()
    if (isLoggedIn) {
      setRedirectToReferrer(true);
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loading) {
      return
    }
    loginRequest(credential);
    clearMenu();
    // history.push('/app/dashboard');
  }

  const handleChange = (event, field) => {
    let value = event.target.value;
    credential[field] = value;
    setCredential(prev=>({
      ...prev,
      ...credential
    }))
  }

  const handleKeyDown = event => {
    if (event.keyCode === 13 && credential.password && credential.email) {
      handleLogin(event);
    }
  }

  let { from } = location.state || { from: { pathname: '/dashboard' } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }
  const SignInButtonStyle = {
    width: '100%',
    borderRadius: '20px'
  }
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            {/* <Link to="/dashboard">ZEEP BACK OFFICE</Link> */}
            <img alt="#" src={Logo}/>
            <h1>SIGN IN</h1>
          </div>
          <div className="isoSignInForm">
              <div className="isoInputWrapper">
                Email Address
                <Input 
                  prefix={<MailOutlined className="icon" />}
                  size="large"
                  required
                  placeholder="Email Address" 
                  autoComplete="false" 

                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(value) => handleChange(value, "email")}
                />
              </div>
              <div className="isoInputWrapper">
                Password
                <Input.Password
                  prefix={<LockOutlined className="icon" />}
                  size="large"
                  required
                  type="password"
                  placeholder="Password"
                  autoComplete="false"
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(value) => handleChange(value, "password")}
                />
              </div>
              <div className='isoInputWrapper extraPadTop'>
                <Button
                size='large'
                  loading={loading}
                  type="primary" onClick={handleLogin}
                  disabled={ !Object.keys.length || !credential.email || !credential.password}
                  style={SignInButtonStyle}>
                   { loading? "Signing in" : "Sign in"}
                </Button>
              </div>
              <div className="isoInputWrapper">
                <a href="/forgot-password" className="isoForgotPass">Forgot Password?</a>
              </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
