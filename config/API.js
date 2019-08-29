import axios from 'axios';

const BaseURL = 'http://api.polagroup.co.id';

const API = axios.create({
  baseURL: BaseURL
})

export {
  API, BaseURL
}