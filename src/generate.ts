import { DataType, handlers } from './constants';
import { generateValue } from './generates';

export function generate(
  count: number,
  fields:
    | string[]
    | { fieldName: string; type: DataType | Array<any>; args?: any }[]
    | { [key: string]: { type: DataType | Array<any>; args?: any } }
): any {
  const result = [];
  const existedMap: Record<string, Array<any>> = {};
  for (let i = 0; i < count; i++) {
    const item: any = {};
    if (Array.isArray(fields)) {
      if (
        fields.filter((f) => typeof f === 'string').length === fields.length
      ) {
        // string[]
        fields.forEach((f) => {
          item[f as string] = handlers.words({ count: 2 });
        });
      } else {
        // {fieldName, ...}[]
        fields.forEach((field: any) => {
          if (!existedMap[field.fieldName]) {
            existedMap[field.fieldName] = [];
          }
          item[field.fieldName] = generateValue(
            field.type,
            field.args,
            existedMap[field.fieldName]
          );
          existedMap[field.fieldName].push(item[field.fieldName]);
        });
      }
    } else {
      Object.keys(fields).forEach((key: string) => {
        if (!existedMap[key]) {
          existedMap[key] = [];
        }
        item[key as string] = generateValue(
          fields[key].type,
          fields[key].args,
          existedMap[key]
        );
        existedMap[key].push(item[key]);
      });
    }
    result.push(item);
  }
  return result.length === 1 ? result[0] : result;
}
