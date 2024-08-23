import { generateTimestamps } from './generates';

test('generateTimestamps', () => {
  const d = generateTimestamps(10);
  console.log(d);
  expect(d.length).toBe(10);
});