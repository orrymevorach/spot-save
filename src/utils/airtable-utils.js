export const transformFields = ({ transformedFields, record }) => {
  let transformedFieldsObj = {};
  const entries = Object.entries(record.fields);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const transformedKey = transformedFields[key];
    transformedFieldsObj[transformedKey] = value;
    transformedFieldsObj.id = record.getId();
  }
  return transformedFieldsObj;
};

export const removeDuplicatesByProperty = ({ array, property }) => [
  ...new Map(array.map(m => [m[property], m])).values(),
];
