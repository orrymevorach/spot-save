const Airtable = require('airtable');

var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId, recordId, newFields } = req.body;
    try {
      await base(tableId).update([
        {
          id: recordId,
          fields: {
            ...newFields,
          },
        },
      ]);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
