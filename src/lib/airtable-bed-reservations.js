import { client } from '@/graphql/apollo-config';
import {
  RESERVE_BACK_BUNK_LEFT,
  RESERVE_BACK_BUNK_RIGHT,
  RESERVE_BACK_COT_LEFT,
  RESERVE_BACK_COT_RIGHT,
  RESERVE_BACK_LOFT_LEFT,
  RESERVE_BACK_LOFT_RIGHT,
  RESERVE_FRONT_BUNK_LEFT,
  RESERVE_FRONT_BUNK_RIGHT,
  RESERVE_FRONT_COT_LEFT,
  RESERVE_FRONT_COT_RIGHT,
  RESERVE_FRONT_LOFT_LEFT,
  RESERVE_FRONT_LOFT_RIGHT,
} from '@/graphql/bed-mutations';

export const reserveFrontBunkLeft = async ({ cabinId, frontBunkLeft = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_FRONT_BUNK_LEFT,
      variables: {
        cabinId,
        frontBunkLeft,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveFrontCotLeft = async ({ cabinId, frontCotLeft = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_FRONT_COT_LEFT,
      variables: {
        cabinId,
        frontCotLeft,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBackCotLeft = async ({ cabinId, backCotLeft = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BACK_COT_LEFT,
      variables: {
        cabinId,
        backCotLeft,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveFrontLoftLeft = async ({ cabinId, frontLoftLeft = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_FRONT_LOFT_LEFT,
      variables: {
        cabinId,
        frontLoftLeft,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBackLoftLeft = async ({ cabinId, backLoftLeft = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BACK_LOFT_LEFT,
      variables: {
        cabinId,
        backLoftLeft,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBackBunkLeft = async ({ cabinId, backBunkLeft = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BACK_BUNK_LEFT,
      variables: {
        cabinId,
        backBunkLeft,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveFrontBunkRight = async ({
  cabinId,
  frontBunkRight = '',
}) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_FRONT_BUNK_RIGHT,
      variables: {
        cabinId,
        frontBunkRight,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveFrontCotRight = async ({ cabinId, frontCotRight = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_FRONT_COT_RIGHT,
      variables: {
        cabinId,
        frontCotRight,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBackCotRight = async ({ cabinId, backCotRight = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BACK_COT_RIGHT,
      variables: {
        cabinId,
        backCotRight,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveFrontLoftRight = async ({
  cabinId,
  frontLoftRight = '',
}) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_FRONT_LOFT_RIGHT,
      variables: {
        cabinId,
        frontLoftRight,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBackLoftRight = async ({ cabinId, backLoftRight = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BACK_LOFT_RIGHT,
      variables: {
        cabinId,
        backLoftRight,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBackBunkRight = async ({ cabinId, backBunkRight = '' }) => {
  try {
    const { data } = await client.mutate({
      mutation: RESERVE_BACK_BUNK_RIGHT,
      variables: {
        cabinId,
        backBunkRight,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const reserveBedsMap = {
  frontBunkLeft: reserveFrontBunkLeft,
  frontCotLeft: reserveFrontCotLeft,
  backCotLeft: reserveBackCotLeft,
  frontLoftLeft: reserveFrontLoftLeft,
  backLoftLeft: reserveBackLoftLeft,
  backBunkLeft: reserveBackBunkLeft,
  frontBunkRight: reserveFrontBunkRight,
  frontCotRight: reserveFrontCotRight,
  backCotRight: reserveBackCotRight,
  frontLoftRight: reserveFrontLoftRight,
  backLoftRight: reserveBackLoftRight,
  backBunkRight: reserveBackBunkRight,
};
