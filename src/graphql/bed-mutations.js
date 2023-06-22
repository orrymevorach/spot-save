import { gql } from '@apollo/client';

export const RESERVE_FRONT_BUNK_LEFT = gql`
  mutation ReserveFrontBunkLeft($cabinId: String, $frontBunkLeft: String) {
    update_cabins(id: $cabinId, frontBunkLeft: [$frontBunkLeft]) {
      id
    }
  }
`;

export const RESERVE_FRONT_COT_LEFT = gql`
  mutation ReserveFrontCitLeft($cabinId: String, $frontCotLeft: String) {
    update_cabins(id: $cabinId, frontCotLeft: [$frontCotLeft]) {
      id
    }
  }
`;

export const RESERVE_BACK_COT_LEFT = gql`
  mutation ReserveBackCotLeft($cabinId: String, $backCotLeft: String) {
    update_cabins(id: $cabinId, backCotLeft: [$backCotLeft]) {
      id
    }
  }
`;

export const RESERVE_FRONT_LOFT_LEFT = gql`
  mutation ReserveFrontLoftLeft($cabinId: String, $frontLoftLeft: String) {
    update_cabins(id: $cabinId, frontLoftLeft: [$frontLoftLeft]) {
      id
    }
  }
`;

export const RESERVE_BACK_LOFT_LEFT = gql`
  mutation ReserveBackLoftLeft($cabinId: String, $backLoftLeft: String) {
    update_cabins(id: $cabinId, backLoftLeft: [$backLoftLeft]) {
      id
    }
  }
`;

export const RESERVE_BACK_BUNK_LEFT = gql`
  mutation ReserveBackBunkLeft($cabinId: String, $backBunkLeft: String) {
    update_cabins(id: $cabinId, backBunkLeft: [$backBunkLeft]) {
      id
    }
  }
`;

export const RESERVE_FRONT_BUNK_RIGHT = gql`
  mutation ReserveFrontBunkRight($cabinId: String, $frontBunkRight: String) {
    update_cabins(id: $cabinId, frontBunkRight: [$frontBunkRight]) {
      id
    }
  }
`;

export const RESERVE_FRONT_COT_RIGHT = gql`
  mutation ReserveFrontCitRight($cabinId: String, $frontCotRight: String) {
    update_cabins(id: $cabinId, frontCotRight: [$frontCotRight]) {
      id
    }
  }
`;

export const RESERVE_BACK_COT_RIGHT = gql`
  mutation ReserveBackCotRight($cabinId: String, $backCotRight: String) {
    update_cabins(id: $cabinId, backCotRight: [$backCotRight]) {
      id
    }
  }
`;

export const RESERVE_FRONT_LOFT_RIGHT = gql`
  mutation ReserveFrontLoftRight($cabinId: String, $frontLoftRight: String) {
    update_cabins(id: $cabinId, frontLoftRight: [$frontLoftRight]) {
      id
    }
  }
`;

export const RESERVE_BACK_LOFT_RIGHT = gql`
  mutation ReserveBackLoftRight($cabinId: String, $backLoftRight: String) {
    update_cabins(id: $cabinId, backLoftRight: [$backLoftRight]) {
      id
    }
  }
`;

export const RESERVE_BACK_BUNK_RIGHT = gql`
  mutation ReserveBackBunkRight($cabinId: String, $backBunkRight: String) {
    update_cabins(id: $cabinId, backBunkRight: [$backBunkRight]) {
      id
    }
  }
`;
