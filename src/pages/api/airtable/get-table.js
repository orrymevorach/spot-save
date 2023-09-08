import { transformFields } from '@/utils/airtable-utils';
import { AIRTABLE_TABLES, transformedFields } from '@/utils/constants';

const Airtable = require('airtable');

var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tableId } = req.body;
    try {
      await base(tableId)
        .select()
        .eachPage(function page(records, fetchNextPage) {
          const allRecords = records.map(record => {
            // Transforming keys to snake case
            const fields = transformFields({
              transformedFields: transformedFields[tableId],
              record,
            });
            return fields;
          }, []);
          res.status(200).json({ response: allRecords });
        });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
