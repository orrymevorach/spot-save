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
