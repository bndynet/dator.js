import { generate } from './generate';

test('generate: simple', () => {
  const arrayLength = 3;
  const d = generate(arrayLength, ['name', 'location']);
  expect(d.length).toBe(arrayLength);
});

test('generate: array', () => {
  const arrayLength = 3;
  const d = generate(arrayLength, [{fieldName: 'name', type: 'city'}, { fieldName: 'value', type: 'number'}]);
  console.log('generate: array', d);
  expect(d.length).toBe(arrayLength);
});

test('generate: advanced', () => {
  const arrayLength = 10;
  const d = generate(arrayLength, {
    name: {
      type: 'username',
    },
    email: {
      type: 'email',
    },
    age: {
      type: 'number',
      args: { min: 10, max: 50 },
    },
    dateOfBirth: {
      type: 'date',
    }
  });
  console.log(d);
  expect(d.length).toBe(arrayLength);
  d.forEach((element: object) => {
    Object.keys(element).forEach(key => {
      expect((element as any)[key]).toBeTruthy();
    })
  });
});
