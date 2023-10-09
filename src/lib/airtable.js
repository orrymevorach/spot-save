import { RESERVE_BED, CLEAR_CURRENT_BED_SELECTION } from '@/graphql/queries';
import { client } from '@/graphql/apollo-config';
import { AIRTABLE_TABLES } from '@/utils/constants';

export const getTableData = async ({ tableId }) => {
  const { response } = await fetch('/api/airtable/get-table', {
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

export const getRecordById = async ({ tableId, recordId }) => {
  try {
    const { response } = await fetch('/api/airtable/get-record-by-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId, recordId }),
    }).then(res => res.json());
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

export const getUserByEmail = async ({ email }) => {
  try {
    const response = await getTableData({ tableId: AIRTABLE_TABLES.USERS });
    const user = response.find(({ emailAddress }) => emailAddress === email);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByRecordId = async ({ id }) => {
  try {
    const response = await getRecordById({
      tableId: AIRTABLE_TABLES.USERS,
      recordId: id,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBed = async ({ userId, bedOne, bedTwo }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BED,
      variables: {
        userId,
        bedOne,
        bedTwo,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const clearCurrentBedSelection = async ({ userId }) => {
  try {
    const { data } = await client.mutate({
      mutation: CLEAR_CURRENT_BED_SELECTION,
      variables: {
        userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
