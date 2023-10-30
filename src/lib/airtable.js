import { AIRTABLE_TABLES } from '@/utils/constants';

export const getTableData = async ({ tableId, queryName }) => {
  const { response } = await fetch(`/api/airtable/get-table?${queryName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tableId,
    }),
  }).then(res => res.json());
  return response;
};

export const getRecordById = async ({ tableId, recordId, queryName }) => {
  try {
    const { response } = await fetch(
      `/api/airtable/get-record-by-id?${queryName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableId, recordId }),
      }
    ).then(res => res.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createRecord = async ({ tableId, newFields }) => {
  try {
    const { response } = await fetch('/api/airtable/create-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, newFields }),
    }).then(res => res.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecord = async ({ tableId, recordId, newFields }) => {
  try {
    const { response } = await fetch('/api/airtable/update-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, recordId, newFields }),
    }).then(res => res.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};
