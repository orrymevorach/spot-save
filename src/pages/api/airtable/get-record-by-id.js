import { transformFields } from '@/utils/airtable-utils';

const Airtable = require('airtable');

var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

const checkIfIsReferenceField = ({ fieldValue }) => {
  if (Array.isArray(fieldValue) && fieldValue.length > 0) {
    const firstItem = fieldValue[0];
    const isFirstItemString = typeof firstItem === 'string';
    const isReferenceField =
      isFirstItemString && firstItem.substring(0, 3) === 'rec';
    if (isReferenceField) return true;
  }
  return false;
};

const getReferenceFieldData = async ({ fieldValue, tableId }) => {
  return await Promise.all(
    fieldValue.map(referenceId => {
      return base(tableId).find(referenceId);
    })
  );
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recordId, tableId } = req.body;
    try {
      const record = await base(tableId).find(recordId);
      const recordFields = transformFields({
        record,
      });
      for (const fieldName in recordFields) {
        const fieldValue = recordFields[fieldName];
        // Checking if the field value is an array with multiple itens
        const isReferenceField = checkIfIsReferenceField({ fieldValue });

        if (isReferenceField) {
          // Getting level 1 nested reference field data
          const referencedRecords = await getReferenceFieldData({
            fieldValue,
            tableId,
          });

          // Start of transforming fields + getting level 2 nested reference field data
          const transformedRecords = await Promise.all(
            referencedRecords.map(async record => {
              // Transforming fields
              const transformedFields = transformFields({ record });

              // Getting nested reference field data
              for (const nestedFieldName in transformedFields) {
                const nestedFieldValue = transformedFields[nestedFieldName];
                const isNestedReferenceField = checkIfIsReferenceField({
                  fieldValue: nestedFieldValue,
                });
                if (isNestedReferenceField) {
                  const nestedReferencedRecords = await getReferenceFieldData({
                    fieldValue: nestedFieldValue,
                    tableId,
                  });
                  const transformedNestedFields = nestedReferencedRecords.map(
                    record => transformFields({ record })
                  );
                  transformedFields[nestedFieldName] = transformedNestedFields;
                }
              }
              return transformedFields;
            })
          );
          recordFields[fieldName] = transformedRecords;
        }
      }

      res.status(200).json({ response: recordFields });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
