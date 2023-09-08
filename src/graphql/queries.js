import { gql } from '@apollo/client';
import { CABIN_FRAGMENT, USER_FRAGMENT } from './fragments';

export const RESERVE_SPOT_IN_CABIN = gql`
  mutation ReserveSpot($cabinId: String, $attendeeId: String) {
    update_ticketPurchases(
      id: $attendeeId
      cabin: [$cabinId]
      deskOne: []
      deskTwo: []
    ) {
      id
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String) {
    ticketPurchases(emailAddress: $email) {
      id
      paymentIntent
      name
      emailAddress
      cabin {
        ...CabinFields
      }
    }
  }
  ${CABIN_FRAGMENT}
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: String) {
    ticketPurchases(id: $id) {
      ...UserFields
    }
  }
  ${USER_FRAGMENT}
`;

export const RESERVE_BED = gql`
  mutation ReserveBed($userId: String, $deskOne: [String], $deskTwo: [String]) {
    update_ticketPurchases(id: $userId, deskOne: $deskOne, deskTwo: $deskTwo) {
      id
    }
  }
`;

export const CLEAR_CURRENT_BED_SELECTION = gql`
  mutation ReserveBed($userId: String) {
    update_ticketPurchases(id: $userId, deskOne: [], deskTwo: []) {
      id
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($groupName: String, $members: [String]) {
    insert_groups(groupName: $groupName, members: $members) {
      id
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation UpdateGroup($id: String, $members: [String]) {
    update_groups(id: $id, members: $members) {
      id
    }
  }
`;
