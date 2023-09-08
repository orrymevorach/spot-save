import { gql } from '@apollo/client';

export const CABIN_FRAGMENT = gql`
  fragment CabinFields on cabins {
    id
    openBeds
    name
    status
    totalBeds
    availability
    unit
    additionalInformation
    images
    attendees {
      name
      cabin {
        name
      }
    }
    deskOne {
      id
      name
      emailAddress
    }
    deskTwo {
      id
      name
      emailAddress
    }
  }
`;

export const GROUP_FRAGMENT = gql`
  fragment GroupFields on groups {
    id
    members {
      id
      name
      emailAddress
      paymentIntent
      cabin {
        ...CabinFields
      }
    }
  }
  ${CABIN_FRAGMENT}
`;

export const USER_FRAGMENT = gql`
  fragment UserFields on ticketPurchases {
    id
    name
    emailAddress
    paymentIntent
    cabin {
      ...CabinFields
    }
    group {
      ...GroupFields
    }
  }
  ${CABIN_FRAGMENT}
  ${GROUP_FRAGMENT}
`;
