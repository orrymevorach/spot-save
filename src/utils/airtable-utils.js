import { toCamelCase } from './string-utils';

export const transformFields = ({ record }) => {
  let transformedFieldsObj = {};
  const entries = Object.entries(record.fields);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const transformedKey = toCamelCase(key);
    transformedFieldsObj[transformedKey] = value;
    transformedFieldsObj.id = record.id;
  }
  return transformedFieldsObj;
};

export const removeDuplicatesByProperty = ({ array, property }) => [
  ...new Map(array.map(m => [m[property], m])).values(),
];
