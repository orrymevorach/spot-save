import { gql } from '@apollo/client';

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
