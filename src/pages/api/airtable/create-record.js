import { airtableBase, transformFields } from '@/utils/airtable-utils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, newFields } = req.body;
    try {
      const response = await airtableBase(tableId).create([
        {
          fields: {
            ...newFields,
          },
        },
      ]);
      const record = response[0];
      const fields = transformFields({ record });
      const transformedRecord = {
        id: record.id,
        ...fields,
      };
      res.status(200).json({ response: transformedRecord });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
