import * as nock from 'nock';

import TinderClient from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

nock.load('./src/__tests__/mocks/auth.json');

const tinderClient = new TinderClient();

it('Authenticate', () => (
  tinderClient.auth(token, id).then((result) => {
    expect(result).toBe(true);
  })
));
