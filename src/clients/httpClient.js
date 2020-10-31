import axios from 'axios';

export default class HttpClient {
  get(url) {
    return axios.get(url).then(res => res.data);
  }
}
