import axios from 'axios';
import { create } from 'zustand';
import { notification } from 'antd';
import { baseURL, getInternalHeaders, getHeaders } from '../common/common';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const authStore = create((set) => ({
  isAuthenticated: false,
  loading: false,

  checkAuthorization: () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      set({ isAuthenticated: true });
    }
    return token
  },

  loginRequest: async (credential) => {
    set({ loading: true });
    const url = baseURL+'/auth/signin';
    try {
      const response = await axios.post(
        url,
        credential,
        {
            ...getInternalHeaders()
        }
      )
      const res = response.data||{};
      if(res.status_code === 200){
        const user_type = res.data?.user?.user_type;
        if(["admin", "support"].includes(user_type)){
          set({ isAuthenticated: true });
          localStorage.setItem("user",JSON.stringify(res.data.user))
          localStorage.setItem("id_token",res.data.token)
          localStorage.setItem("access_token",res.data.token)
        } else {
          notification['error']({
            message: 'Sign in',
            description: "Access denied. You are not authorized to access this portal.",
          });
        }
        
      } else {
        notification['error']({
          message: 'Sign in',
          description: res.message,
        });
      }
      set({ loading: false });
    } catch (error){
      set({ loading: false });
      notification['error']({
        message: 'Sign in',
        description: 'Something went wrong.'
      });

    }
  },

  forgotPasswordRequest: async (params) => {
    set({ loading: true });
    const url = baseURL+'/auth/forgot-password';
    try {
      const response = await axios.put(
        url,
        params,
        {
            ...getInternalHeaders()
        }
      )
      const res = response.data||{};
      if(res.status === "ok"){
        notification['success']({
          message: 'Forgot Password',
          description: res.message || 'Temporary password has been sent to your email!'
        });
      } else {
        notification['error']({
          message: 'Forgot Password',
          description: res.message
        });      
      }
      set({ loading: false });
    } catch (error){
      set({ loading: false });
      notification['error']({
        message: 'Forgot Password',
        description: 'Something went wrong.'
      });   
    }
  },

  resetPasswordRequest: async (params) => {
    set({ loading: true });
    const url = baseURL+'/auth/change-password';
    try {
      const response = await axios.put(
        url,
        params,
        {
            ...getHeaders()
        }
      )
      const res = response.data||{};
      if(res.status === "ok"){
        notification['success']({
          message: 'Change Password',
          description: res.message || 'Password updated successfully!'
        });
        setTimeout(() => {
          localStorage.clear()
          history.replace('/');
          window.location.reload()         
        }, 1500);
      } else {
        notification['error']({
          message: 'Change Password',
          description: res.message
        });   
      }
      set({ loading: false });
    } catch (error){
      set({ loading: false });
      notification['error']({
        message: 'Change Password',
        description: 'Something went wrong.'
      });  
    }
  },

  logoutRequest: () => {
    localStorage.clear()
    history.replace('/');
    window.location.reload()
  }

}));

export default authStore;
