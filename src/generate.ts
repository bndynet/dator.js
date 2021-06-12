import { faker } from '@faker-js/faker';

const handlers = {
  number: (args?: { min?: number; max?: number }) => {
    return faker.number.int(args);
  },
  float: (args?: {
    min?: number;
    max?: number;
    fractionDigits?: number;
    multipleOf?: number;
  }) => {
    return faker.number.float(args);
  },
  username: () => {
    return faker.internet.userName();
  },
  avatar: () => {
    return faker.image.avatar();
  },
  image: (args?: { width?: number; height?: number }) => {
    return faker.image.url(args);
  },
  country: () => {
    return faker.location.country();
  },
  countryCode: () => {
    return faker.location.countryCode();
  },
  state: () => {
    return faker.location.state();
  },
  city: () => {
    return faker.location.city();
  },
  timezone: () => {
    return faker.location.timeZone();
  },
  zipCode: () => {
    return faker.location.zipCode();
  },
  phoneNumber: () => {
    return faker.phone.number();
  },
  words: (args?: { count?: number | { min: number; max: number } }) => {
    return faker.word.words(args);
  },
  string: (args?: {
    length:
      | number
      | {
          max: number;
          min: number;
        };
  }) => {
    return faker.string.alpha(args);
  },
  paragraphs: (args?: { min?: number; max?: number; separator?: string }) => {
    return faker.lorem.paragraphs(args as any);
  },
  ip: () => {
    return faker.internet.ipv4();
  },
  color: () => {
    return faker.internet.color();
  },
  email: () => {
    return faker.internet.email();
  },
  emoji: () => {
    return faker.internet.emoji();
  },
  url: () => {
    return faker.internet.url();
  },
  date: undefined,
  datetime: () => {
    return faker.date.past();
  },
  month: () => {
    return faker.date.month();
  },
};

export type DataType = keyof typeof handlers;

export function generate(
  count: number,
  fields: string[] | { [key: string]: { type: DataType; args?: any } }
): any {
  const result = [];
  for (let i = 0; i < count; i++) {
    const item: any = {};
    if (Array.isArray(fields)) {
      fields.forEach((f) => {
        item[f] = handlers.words({ count: 2 });
      });
    } else {
      Object.keys(fields).forEach((key: string) => {
        const dType = fields[key].type;
        if (dType) {
          const handler = handlers[dType] as Function;
          if (handler) {
            item[key] = handler(fields[key].args);
          } else {
            if (dType === 'date') {
              const now = new Date();
              const startOfDay = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
              );
              const stamp = startOfDay.getTime();
              const offsetDays = (i - count) * 24 * 60 * 60 * 1000;
              item[key] = new Date(stamp + offsetDays);
            }
          }
        }
      });
    }
    result.push(item);
  }
  return result.length === 1 ? result[0] : result;
}
