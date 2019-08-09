import axios from 'axios';

const API = axios.create({
  baseURL: 'http://3045cf06.ngrok.io'
})

export {
  API
}