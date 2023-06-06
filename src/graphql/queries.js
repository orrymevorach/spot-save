import { gql } from '@apollo/client';

export const GET_CABINS = gql`
  query GetCabins {
    cabins {
      id
      openBeds
      name
      status
      totalBeds
      unit
      additionalInformation
    }
  }
`;

export const RESERVE_SPOT_IN_CABIN = gql`
  mutation ReserveSpot($cabinId: String, $attendeeId: String) {
    update_attendees(id: $attendeeId, cabin: [$cabinId]) {
      id
    }
  }
`;

export const GET_USER = gql`
  query GetUser($email: String) {
    attendees(email: $email) {
      id
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: String) {
    attendees(id: $id) {
      id
      cabin {
        name
        unit
      }
    }
  }
`;
