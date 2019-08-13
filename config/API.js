import axios from 'axios';

const API = axios.create({
  baseURL: 'http://222be5a7.ngrok.io'
})

export {
  API
}