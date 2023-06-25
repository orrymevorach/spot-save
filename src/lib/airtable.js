import {
  GET_CABINS,
  GET_USER_BY_EMAIL,
  RESERVE_SPOT_IN_CABIN,
  GET_USER_BY_ID,
  GET_CABIN,
} from '@/graphql/queries';
import { client } from '@/graphql/apollo-config';

export const getCabins = async () => {
  try {
    const { data } = await client.query({
      query: GET_CABINS,
    });
    return data.cabins;
  } catch (error) {
    console.log(error);
  }
};

export const getCabin = async ({ cabinName }) => {
  try {
    const { data } = await client.query({
      query: GET_CABIN,
      variables: {
        cabinName,
      },
    });
    return data.cabins[0];
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
    return data.update_tickets;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async ({ email }) => {
  try {
    const { data } = await client.query({
      query: GET_USER_BY_EMAIL,
      variables: { email },
      fetchPolicy: 'no-cache',
    });
    return data.tickets[0];
  } catch (error) {
    console.log(error);
  }
};

export const getUserByRecordId = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_USER_BY_ID,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    return data.tickets[0];
  } catch (error) {
    console.log(error);
  }
};
