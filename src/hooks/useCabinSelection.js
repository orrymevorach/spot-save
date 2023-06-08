import { useUser } from '@/context/user-context';
const { useReducer, useEffect } = require('react');

const actions = {
  OPEN_CABIN_SELECTION: 'OPEN_CABIN_SELECTION',
  CLOSE_CABIN_SELECTION: 'CLOSE_CABIN_SELECTION',
  ADD_ADDITIONAL_GUEST: 'ADD_ADDITIONAL_GUEST',
  REMOVE_GUEST: 'REMOVE_GUEST',
  VERIFY_GUEST: 'VERIFY_GUEST',
};

const {
  OPEN_CABIN_SELECTION,
  CLOSE_CABIN_SELECTION,
  ADD_ADDITIONAL_GUEST,
  VERIFY_GUEST,
  REMOVE_GUEST,
} = actions;

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_CABIN_SELECTION:
      return {
        ...state,
        showTakeover: true,
        selectedCabin: action.cabin,
      };
    case CLOSE_CABIN_SELECTION:
      return {
        ...state,
        showTakeover: false,
      };
    case ADD_ADDITIONAL_GUEST:
      return {
        ...state,
        numberOfGuestsInReservation: state.numberOfGuestsInReservation + 1,
      };
    case REMOVE_GUEST:
      return {
        ...state,
        numberOfGuestsInReservation: state.numberOfGuestsInReservation - 1,
      };
    case VERIFY_GUEST:
      return {
        ...state,
        verifiedEmails: action.verifiedEmails,
        verifiedUsers: action.verifiedUsers,
      };
  }
};

const getInitialState = ({ user }) => ({
  selectedCabin: null,
  showTakeover: false,
  numberOfGuestsInReservation: 1,
  verifiedEmails: [], // used to verify users
  verifiedUsers: [], // used to display user names after verification
});

export const useCabinSelectionReducer = () => {
  const user = useUser();
  const initialState = getInitialState({ user });
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add current user on page load
  useEffect(() => {
    if (user && !state.verifiedEmails.length) {
      dispatch({
        type: VERIFY_GUEST,
        verifiedEmails: [user.emailAddress],
        verifiedUsers: [user],
      });
    }
  }, [user, state.verifiedEmails]);
  return {
    ...state,
    dispatch,
    actions,
  };
};
