import { gql } from '@apollo/client';

export const CABIN_FRAGMENT = gql`
  fragment CabinFields on cabins {
    id
    openBeds
    name
    status
    totalBeds
    unit
    additionalInformation
    images
    frontBunkLeft {
      id
      name
    }
    frontCotLeft {
      id
      name
    }
    backCotLeft {
      id
      name
    }
    frontLoftLeft {
      id
      name
    }
    backLoftLeft {
      id
      name
    }
    backBunkLeft {
      id
      name
    }
    frontBunkRight {
      id
      name
    }
    frontCotRight {
      id
      name
    }
    backCotRight {
      id
      name
    }
    frontLoftRight {
      id
      name
    }
    backLoftRight {
      id
      name
    }
    backBunkRight {
      id
      name
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
    }
  }
`;
