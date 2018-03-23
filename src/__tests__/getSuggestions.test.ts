import * as nock from 'nock';

import TinderClient from '..'; // tslint:disable-line import-name
import { token, id } from './util/getAuth';

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getSuggestions.json');

const tinderClient = new TinderClient();

beforeAll(() => (
  tinderClient.auth(token, id)
));

it('gets recommentations', async () => {
  const suggestions = await tinderClient.getSuggestions();
  expect(suggestions).toBeDefined();
  expect(suggestions[0].birthDate).toBeInstanceOf(Date);

  expect(suggestions).toMatchSnapshot();
});
