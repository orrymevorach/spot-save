import { gql } from '@apollo/client';

export const RESERVE_SPOT_IN_CABIN = gql`
  mutation ReserveSpot($cabinId: String, $attendeeId: String) {
    update_ticketPurchases(
      id: $attendeeId
      cabin: [$cabinId]
      bedOne: []
      bedTwo: []
    ) {
      id
    }
  }
`;

export const RESERVE_BED = gql`
  mutation ReserveBed($userId: String, $bedOne: [String], $bedTwo: [String]) {
    update_ticketPurchases(id: $userId, bedOne: $bedOne, bedTwo: $bedTwo) {
      id
    }
  }
`;

export const CLEAR_CURRENT_BED_SELECTION = gql`
  mutation ReserveBed($userId: String) {
    update_ticketPurchases(id: $userId, bedOne: [], bedTwo: []) {
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
