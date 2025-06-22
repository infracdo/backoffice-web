const baseURL =  process.env.REACT_APP_API_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

const getHeaders = () => ({
   headers: {
    'responseType': 'applicatio/json',
    'token': localStorage.getItem('access_token')
  }
})

const getInternalHeaders = () => ({
    headers: {
        'responseType': 'applicatio/json',
        'token': API_TOKEN
      }
})

export { baseURL, getHeaders, getInternalHeaders};
