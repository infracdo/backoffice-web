import axios from 'axios';
import { create } from 'zustand';
import fileDownload from 'js-file-download';
import { message, notification } from 'antd';
import { baseURL, getHeaders } from '../common/common';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const getData = create((set) => ({
  get_loading: false,
  error: null,
  getRequest: async (route, params) => {
    set({ get_response: {}, get_loading: true });
    const queryParams = new URLSearchParams(params).toString();
    try {
      const url = queryParams? `${baseURL}/${route}?${queryParams}`: `${baseURL}/${route}`;
      const response = await axios.get(
        url,
        {...getHeaders()}
      )
      set({ get_loading: false });
      return {
        loading: false,
        ...response.data,
      }
    } catch (error) {
      // console.log("error ", error)
      if(error.toString().includes("401")){
        notification['error']({
          message: "User session expired.", 
          description: 'Please re-login.'
        }) 
        setTimeout(() => {
          localStorage.clear()
          history.replace('/');
          window.location.reload()		
        }, 2000);
      } else {
        message.error("Something went wrong");
      }
      set({ error, get_loading: false });
      return {
        loading: false
      }
    }
  },
}));

const postData = create((set) => ({
  response: {},
  post_loading: false,
  error: null,
  postRequest: async (route, params) => {
    set({ post_loading: true });
    try {
      const url = `${baseURL}/${route}`;
      const response = await axios.post(
        url,
        params,
        {
            ...getHeaders()
        }
      )
      set({ ... response.data, post_loading: false });
      return response
    } catch (error) {
      set({ error, post_loading: false });
      message.error("Something went wrong");
    }
  },
}));

const putData = create((set) => ({
  response: {},
  put_loading: false,
  error: null,
  putRequest: async (route, params) => {
    set({ put_loading: true });
    try {
      const url = `${baseURL}/${route}`;
      const response = await axios.put(
        url,
        params,
        {
            ...getHeaders()
        }
      )
      set({ ...response.data, put_loading: false });
      return response
    } catch (error) {
      set({ error, put_loading: false });
      message.error("Something went wrong");
    }
  },
}));

const downloadData = create((set) => ({
  downloading: false,
  error: null,
  downloadRequest: async (route, params) => {
    set({ downloading: true });
    message.info("Downloading... Please wait");
    const queryParams = new URLSearchParams(params).toString();
    try{
      const url = queryParams? `${baseURL}/${route}?${queryParams}`: `${baseURL}/${route}`
      const response = await axios.get(
        url,
        {
            ...getHeaders(),
            responseType: 'blob'
        }
      )
      fileDownload(response.data, params.filename+"."+params.file_type);
      set({ downloading: false });
    } catch (error){
      set({ error, downloading: false });
      message.error("Something went wrong");
    }
  },
}));

const uploadData = create((set) => ({
  uploading: false,
  error: null,
  uploadRequest: async (route, params) => {
    set({ uploading: true });
    message.info("Uploading... Please wait");
    let form_data = new FormData();
    form_data.append("file", params.file);
    form_data.append("fsp_id", params.fsp_id);
    form_data.append("user", params.user);
    if(params.access_token){
      form_data.append("access_token", params.access_token);
    }
    try {
      const url = `${baseURL}/${route}`;
      const response = await axios.post(
        url,
        form_data,
        {
          ...getHeaders()
        }
      )
      const res = response.data||{};
      set({ response: res, uploading: false });
      return res
    } catch (error) {
      set({ error, uploading: false });
      message.error("Something went wrong");
    }
  },
}));

export { getData, postData, downloadData, uploadData, putData};
