import {
  GET_USER_BY_EMAIL,
  RESERVE_SPOT_IN_CABIN,
  GET_USER_BY_ID,
  GET_CABIN,
  RESERVE_BED,
  CLEAR_CURRENT_BED_SELECTION,
  CREATE_GROUP,
  UPDATE_GROUP,
} from '@/graphql/queries';
import { client } from '@/graphql/apollo-config';
import { AIRTABLE_TABLES } from '@/utils/constants';

export const getOffices = async () => {
  try {
    const { response } = await fetch('/api/airtable/get-table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableId: AIRTABLE_TABLES.OFFICES,
      }),
    }).then(res => res.json());
    return response;
  } catch (err) {
    console.log('err', err);
  }
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

export const reserveSpotInCabin = async ({ cabinId = '', attendeeId }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_SPOT_IN_CABIN,
      variables: {
        cabinId,
        attendeeId,
      },
    });
    return data.update_ticketPurchases;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async ({ email }) => {
  try {
    const { response } = await fetch('/api/airtable/get-table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId: AIRTABLE_TABLES.USERS }),
    }).then(res => res.json());
    const user = response.find(({ emailAddress }) => emailAddress === email);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByRecordId = async ({ id }) => {
  try {
    const { response } = await fetch('/api/airtable/get-record-by-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tableId: AIRTABLE_TABLES.USERS, recordId: id }),
    }).then(res => res.json());
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBed = async ({ userId, deskOne, deskTwo }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BED,
      variables: {
        userId,
        deskOne,
        deskTwo,
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

export const createGroup = async ({ groupName, members }) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_GROUP,
      variables: {
        groupName,
        members,
      },
    });
    return data.insert_groups[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateGroup = async ({ groupId, members }) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_GROUP,
      variables: {
        id: groupId,
        members,
      },
    });
    return data.update_groups[0];
  } catch (error) {
    console.log(error);
  }
};
