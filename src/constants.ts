import { faker } from '@faker-js/faker';

export const handlers = {
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