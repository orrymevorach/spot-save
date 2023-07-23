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
    frontBunkLeft {
      id
      name
      emailAddress
    }
    frontCotLeft {
      id
      name
      emailAddress
    }
    backCotLeft {
      id
      name
      emailAddress
    }
    frontLoftLeft {
      id
      name
      emailAddress
    }
    backLoftLeft {
      id
      name
      emailAddress
    }
    backBunkLeft {
      id
      name
      emailAddress
    }
    frontBunkRight {
      id
      name
      emailAddress
    }
    frontCotRight {
      id
      name
      emailAddress
    }
    backCotRight {
      id
      name
      emailAddress
    }
    frontLoftRight {
      id
      name
      emailAddress
    }
    backLoftRight {
      id
      name
      emailAddress
    }
    backBunkRight {
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
