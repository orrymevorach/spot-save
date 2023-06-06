import {
  GET_CABINS,
  GET_USER,
  RESERVE_SPOT_IN_CABIN,
  GET_USER_BY_ID,
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

export const reserveSpotInCabin = async ({ cabinId = '', attendeeId }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_SPOT_IN_CABIN,
      variables: {
        cabinId,
        attendeeId,
      },
    });
    return data.update_attendees;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async ({ email }) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: { email },
    });
    return data.attendees[0];
  } catch (error) {
    console.log(error);
  }
};

export const getUserByRecordId = async ({ id }) => {
  try {
    const { data } = await client.query({
      query: GET_USER_BY_ID,
      variables: { id },
    });
    return data.attendees[0];
  } catch (error) {
    console.log(error);
  }
};
