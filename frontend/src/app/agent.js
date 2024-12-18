import axios from 'axios';
import { toast } from 'react-toastify';

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  })
}

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(config => {
  // Do something before request is sent
  const token = localStorage.getItem('token');
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(async response => {
  // if (import.meta.env.MODE === 'development') await sleep(100);  
  return response;
}, error => { 
  const { data, status, config } = error.response || {};
  const errorMessage = data?.title || 'An unexpected error occurred.';
  console.error(`Request failed: ${config?.url} [${status}]`);
  toast.error(errorMessage);
  return Promise.reject(error);
})

const responseBody = (response) => response.data;
const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody)
}

const Presentations = {
  list: () => axios.get('/presentations'),
  details: (id) => requests.get(`/presentations/${id}`),
  create: (presentation) => {
    requests.post(`/presentations`, JSON.stringify(presentation));
  },
  update: (presentation) => requests.put(`/presentations/${presentation.id}`, presentation),
  delete: (id) => requests.del(`/presentations/${id}`),
}

const Account = {
  login : (email, password)  => axios.post('/Account/login', {email, password}),
  register: (email, password, userName) => axios.post('/Account/register', {email, password, userName}),
  current: () => axios.get('/Account')
}

const Slides = {
  details: (presentationId, slideId) => requests.get(`/presentations/${presentationId}/Slides/${slideId}`),
  create: (presentationId, presentation) => requests.post(`/presentations/${presentationId}/Slides`, presentation),
  update: (presentationId, slideId, presentation) => requests.put(`/presentations/${presentationId}/Slides/${slideId}`, presentation),
  delete: (presentationId, slideId ) => requests.del(`/presentations/${presentationId}/Slides/${slideId}`),
}

const Elements = {
  list: (presentationId, slideId) => 
    requests.get(`/presentations/${presentationId}/slides/${slideId}/Elements`),
  details: (presentationId, slideId, elementId) => 
    requests.get(`/presentations/${presentationId}/slides/${slideId}/Elements/${elementId}`),
  create: (presentationId, slideId, element) => 
    requests.post(`/presentations/${presentationId}/slides/${slideId}/Elements`, element),
  update: (presentationId, slideId, elementId, element) => 
    requests.put(`/presentations/${presentationId}/slides/${slideId}/Elements/${elementId}`, element),
  delete: (presentationId, slideId, elementId) => 
    requests.del(`/presentations/${presentationId}/slides/${slideId}/Elements/${elementId}`),
  batchUpdate: (presentationId, slideId, elements) => 
    requests.post(`/presentations/${presentationId}/slides/${slideId}/Elements/batch-update`, elements),
};

const agent = {
  Presentations,
  Account,
  Elements,
  Slides
}

export default agent;