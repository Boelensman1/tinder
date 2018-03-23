import * as nock from 'nock';

import Tinder from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

nock.load('./src/__tests__/mocks/auth.json');

const tinder = new Tinder();

it('Authenticate', () => (
  tinder.auth(token, id).then((result) => {
    expect(result).toBe(true);
  })
));
