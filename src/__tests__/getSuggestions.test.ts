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

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getSuggestions.json');
nock.load('./src/__tests__/mocks/likeSuggestion.json');
it('likes a recommentations', async () => {
  const suggestions = await tinderClient.getSuggestions();
  const result = await suggestions[0].like();
  expect(result).toMatchSnapshot();
});

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getSuggestions.json');
nock.load('./src/__tests__/mocks/superLikeSuggestion.json');
it('superLikes a recommentations', async () => {
  const suggestions = await tinderClient.getSuggestions();
  const result = await suggestions[0].superLike();
  expect(result).toMatchSnapshot();
});

nock.load('./src/__tests__/mocks/auth.json');
nock.load('./src/__tests__/mocks/getSuggestions.json');
nock.load('./src/__tests__/mocks/passSuggestion.json');
it('passes a recommentations', async () => {
  const suggestions = await tinderClient.getSuggestions();
  const result = await suggestions[0].pass();
  expect(result).toBe(true);
});
