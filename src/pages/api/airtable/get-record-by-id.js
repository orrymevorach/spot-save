import { transformFields } from '@/utils/airtable-utils';

const Airtable = require('airtable');

var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recordId, tableId } = req.body;
    try {
      const record = await base(tableId).find(recordId);
      const recordFields = transformFields({
        record,
      });
      res.status(200).json({ response: recordFields });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
