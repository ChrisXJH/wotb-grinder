import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const defaultConfig = { maxRPS: null };

export default class HttpClient {
  constructor(config = defaultConfig) {
    const { maxRPS } = config;
    this.http = maxRPS ? rateLimit(axios.create(), { maxRPS }) : axios.create();
  }

  get(url) {
    return this.http.get(url).then(res => res.data);
  }
}
