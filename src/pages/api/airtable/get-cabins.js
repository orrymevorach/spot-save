import { AIRTABLE_TABLES, cabinFields } from '@/utils/constants';

const Airtable = require('airtable');

var base = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await base(AIRTABLE_TABLES.OFFICES)
        .select()
        .eachPage(function page(records, fetchNextPage) {
          const offices = records.map(office => {
            const officeFields = office.fields;
            // Transforming keys to snake case
            let transformedOfficeFields = {};
            const entries = Object.entries(officeFields);
            for (let i = 0; i < entries.length; i++) {
              const [key, value] = entries[i];
              const transformedKey = cabinFields[key];
              transformedOfficeFields[transformedKey] = value;
            }
            return transformedOfficeFields;
          }, []);
          res.status(200).json({ offices });
        });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
