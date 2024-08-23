import { DataType, handlers } from "./constants";

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

export function generateValue(type: DataType, args?: any) {
  let value;
  if (type) {
    const handler = handlers[type] as Function;
    if (handler) {
      value = handler(args);
    } else {
      if (type === 'date') {
        value = generateTimestamps(1, 'day')[0];
      }
    }
  }

  return value;
}