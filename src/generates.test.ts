import {
  generateMonths,
  generateTimestamps,
  generateValue,
  generateWeekdays,
} from './generates';

test('generateTimestamps', () => {
  const d = generateTimestamps(10);
  console.log(d);
  expect(d.length).toBe(10);
});

test('generateValue', () => {
  const options = [1, 2, 3, 4, 5];
  const result: number[] = [];
  for (let i = 0; i < 100; i++) {
    result.push(generateValue(options, null, result));
  }
  console.log(result);
  expect(result.length).toBe(100);
});

test('generateMonths', () => {
  const d = generateMonths();
  console.log(d);
  expect(d.length).toBe(12);
});

test('generateWeekdays', () => {
  const d = generateWeekdays(true);
  console.log(d);
  expect(d.length).toBe(7);
});
