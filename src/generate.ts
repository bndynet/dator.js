import { DataType, handlers } from './constants';
import { generateValue } from './generates';

export function generate(
  count: number,
  fields:
    | string[]
    | { fieldName: string; type: DataType; args?: any }[]
    | { [key: string]: { type: DataType; args?: any } }
): any {
  const result = [];
  for (let i = 0; i < count; i++) {
    const item: any = {};
    if (Array.isArray(fields)) {
      if (
        fields.filter((f) => typeof f === 'string').length === fields.length
      ) {
        fields.forEach((f) => {
          item[f as string] = handlers.words({ count: 2 });
        });
      } else {
        fields.forEach((field: any) => {
          item[field.fieldName] = generateValue(field.type, field.args);
        });
      }
    } else {
      Object.keys(fields).forEach((key: string) => {
        item[key as string] = generateValue(fields[key].type, fields[key].args);
      });
    }
    result.push(item);
  }
  return result.length === 1 ? result[0] : result;
}
