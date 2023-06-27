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
      images
    }
  }
`;

export const GET_CABIN = gql`
  query GetCabin($cabinName: String) {
    cabins(name: $cabinName) {
      id
      name
      unit
      images
      additionalInformation
      openBeds
      frontBunkLeft {
        id
      }
      frontCotLeft {
        id
      }
      backCotLeft {
        id
      }
      frontLoftLeft {
        id
      }
      backLoftLeft {
        id
      }
      backBunkLeft {
        id
      }
      frontBunkRight {
        id
      }
      frontCotRight {
        id
      }
      backCotRight {
        id
      }
      frontLoftRight {
        id
      }
      backLoftRight {
        id
      }
      backBunkRight {
        id
      }
    }
  }
`;

export const RESERVE_SPOT_IN_CABIN = gql`
  mutation ReserveSpot($cabinId: String, $attendeeId: String) {
    update_tickets(id: $attendeeId, cabin: [$cabinId]) {
      id
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String) {
    tickets(emailAddress: $email) {
      id
      paymentIntent
      name
      emailAddress
      cabin {
        id
        name
        unit
        additionalInformation
        images
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: String) {
    tickets(id: $id) {
      id
      name
      emailAddress
      cabin {
        id
        name
        unit
        additionalInformation
        images
      }
    }
  }
`;

export const RESERVE_BED = gql`
  mutation ReserveBed(
    $userId: String
    $frontBunkLeft: [String]
    $frontCotLeft: [String]
    $backCotLeft: [String]
    $frontLoftLeft: [String]
    $backLoftLeft: [String]
    $backBunkLeft: [String]
    $frontBunkRight: [String]
    $frontCotRight: [String]
    $backCotRight: [String]
    $frontLoftRight: [String]
    $backLoftRight: [String]
    $backBunkRight: [String]
  ) {
    update_tickets(
      id: $userId
      frontBunkLeft: $frontBunkLeft
      frontCotLeft: $frontCotLeft
      backCotLeft: $backCotLeft
      frontLoftLeft: $frontLoftLeft
      backLoftLeft: $backLoftLeft
      backBunkLeft: $backBunkLeft
      frontBunkRight: $frontBunkRight
      frontCotRight: $frontCotRight
      backCotRight: $backCotRight
      frontLoftRight: $frontLoftRight
      backLoftRight: $backLoftRight
      backBunkRight: $backBunkRight
    ) {
      id
    }
  }
`;

export const CLEAR_CURRENT_BED_SELECTION = gql`
  mutation ReserveBed($userId: String) {
    update_tickets(
      id: $userId
      frontBunkLeft: []
      frontCotLeft: []
      backCotLeft: []
      frontLoftLeft: []
      backLoftLeft: []
      backBunkLeft: []
      frontBunkRight: []
      frontCotRight: []
      backCotRight: []
      frontLoftRight: []
      backLoftRight: []
      backBunkRight: []
    ) {
      id
    }
  }
`;
