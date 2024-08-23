import { faker } from '@faker-js/faker';
import { DataType, handlers } from './constants';

export function generateTimestamps(
  count: number,
  interval: 'second' | 'minute' | 'hour' | 'day' | 'month' = 'second'
) {
  const result = [];
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    ['day', 'month'].includes(interval) ? 0 : now.getHours(),
    ['hour', 'day', 'month'].includes(interval) ? 0 : now.getMinutes(),
    ['minute', 'hour', 'day', 'month'].includes(interval) ? 0 : now.getSeconds()
  );
  const stamp = start.getTime();
  for (let i = 0; i < count; i++) {
    let offset = 0;
    switch (interval) {
      case 'second':
        offset = i * 1000;
        break;
      case 'minute':
        offset = i * 60 * 1000;
        break;
      case 'hour':
        offset = i * 60 * 60 * 1000;
        break;
      case 'day':
        offset = i * 24 * 60 * 60 * 1000;
        break;
    }
    result.push(stamp - offset);
  }
  return result.reverse();
}

export function generateValue(
  type: DataType | Array<any>,
  args?: any,
  excludes?: Array<any>
) {
  let value;
  if (type) {
    if (typeof type === 'string') {
      const handler = handlers[type] as Function;
      if (handler) {
        value = handler(args);
      } else {
        if (type === 'date') {
          value = generateTimestamps(1, 'day')[0];
        }
      }
    } else if (Array.isArray(type)) {
      value =
        (excludes && excludes.length < type.length)
          ? type.find((t) => !excludes?.includes(t))
          : type[generateRandomInt(0, type.length - 1)];
    }
  }

  return value;
}

export function generateMonths(abbr?: boolean): string[] {
  return (
    abbr
      ? faker.definitions.date.month['abbr']
      : faker.definitions.date.month['wide']
  ) as string[];
}

export function generateWeekdays(abbr?: boolean): string[] {
  return (
    abbr
      ? faker.definitions.date.weekday['abbr']
      : faker.definitions.date.weekday['wide']
  ) as string[];
}

export function generateRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
