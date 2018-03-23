import * as nock from 'nock';

import Tinder from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getSuggestions.json');

const tinder = new Tinder();

beforeAll(() => (
  tinder.auth(token, id)
));

it('gets recommentations', () => (
  tinder.getSuggestions().then((result) => {
    expect(result).toBeDefined();
  })
));
