import { expect, test } from 'vitest'
import { testFunction } from './../lib/StoreTools/tools.js';

test('This is a first test', () => {
  expect(testFunction()).toEqual('hello');
})