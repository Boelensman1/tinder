import axios from 'axios';
import { IncomingMessage } from 'http';

import { Suggestion, Photo } from '../classes';
import { UserMetaData } from '../interfaces';

const clientConfig = {
  baseURL: 'https://api.gotinder.com',
  timeout: 16000,
  headers: {
    'User-Agent': 'Tinder Android Version 4.5.5',
    os_version: '23',
    platform: 'android',
    'app-version': '854',
    'Accept-Language': 'en',
  },
};

/**
 * The main class containing all the functions
 */
class TinderClient {
  /**
   * Handle to the axios client
   */
  private client: any;
  /**
   * Tinder auth token
   */
  private authToken: string;

  constructor() {
    this.client = axios.create(clientConfig);
  }

  /**
   * Authenticate to tinder
   */
  public async auth(facebookToken: string, facebookId: string): Promise<any> {
    // send an authentication request to tinder
    const body = { facebook_token: facebookToken, facebook_id: facebookId };
    const result = await this.client.post('/auth', body);

    this.authToken = result.data.user.api_token;

    // add x-auth token to the client settings
    this.client = axios.create({
      ...clientConfig,
      headers: {
        ...clientConfig.headers,
        'X-Auth-Token': this.authToken,
      },
    });

    return true;
  }

  /**
   * get recommendations
   */
  public async getSuggestions(): Promise<Suggestion[]> {
    const result = await this.doGetRequest('/user/recs');
    return result.results.map((result) => (new Suggestion(this, result)));
  }

  /**
   * Get your own meta data (swipes left, people seen, etc..)
   */
  public async getMeta(): Promise<UserMetaData> {
    const result = await this.doGetRequest('/meta');
    delete result.status;
    return result;
  }

  /**
   * Do a get request using the axios client
   */
  public async doGetRequest(url: string, checkStatus = true, options?: object): Promise<any> {
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    const result = await this.client.get(url, options);
    if (checkStatus && result.data.status !== 200) {
      console.log(result);
      throw new Error('Error while getting results');
    }
    return result.data;
  }

  /**
   * Do a get request using the axios client
   */
  public async doPostRequest(
    url: string,
    data = {},
    checkStatus = true,
    options?: object,
  ): Promise<any> {
    if (!this.authToken) { throw new Error('Authenticate first!'); }

    const result = await this.client.post(url, data, options);
    if (checkStatus && result.data.status !== 200) {
      console.log(result);
      throw new Error('Error while getting results');
    }
    return result.data;
  }
}

export { TinderClient };
