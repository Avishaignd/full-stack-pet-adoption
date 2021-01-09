import axios from "axios";
import Cookies from 'js-cookie'

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${document.cookie}`
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getData = async (url) => {
  const response = await axios.get(url);
  console.log(response);
  const data = response.data;
  return data;
};

export const getDataWithParams = async (url, params) => {
  const response = await axios.get(url, { params });
  console.log(response);
};

export const setTokens = async (url, data) => {
  axios
    .post(url, data)
    .then((response) => {
      Cookies.remove('')
      console.log(response);
      return response;  
    })
    .then((response) => {
      const token = response.data.accessToken
      Cookies.set('', token)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function postSignUp(url = "", data = {}) {
  axios
    .post(url, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data.user))
      Cookies.set('', data.accessToken)
    })
    .then(() => {
      window.location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function postData(url = "", data = {}) {
  axios
    .post(url, data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function updateUser(url="", data={}){
  axios.put(url, data)
  .then(response => {
    console.log(response)
    localStorage.setItem('user', JSON.stringify(response.data))
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function updatePetStatus(url = "", data = {}){
  axios.put(url, data)
  .then(response => {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function updatePetData(url = "", data = {}){
  axios.put(url, data)
  .then(response => {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function postLogin(url = "", data = {}) {
  axios
    .post(url, data)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('refreshToken', data.refreshToken)
      Cookies.set('', data.accessToken)
    })
    .then(() => {
      window.location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
}