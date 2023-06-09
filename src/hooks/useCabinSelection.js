import { useUser } from '@/context/user-context';
const { useReducer, useEffect } = require('react');

const actions = {
  OPEN_CABIN_SELECTION: 'OPEN_CABIN_SELECTION',
  CLOSE_CABIN_SELECTION: 'CLOSE_CABIN_SELECTION',
  ADD_ADDITIONAL_GUEST: 'ADD_ADDITIONAL_GUEST',
  REMOVE_GUEST: 'REMOVE_GUEST',
  VERIFY_GUEST: 'VERIFY_GUEST',
  SET_SELECTION_STAGE: 'SET_SELECTION_STAGE',
};

const {
  OPEN_CABIN_SELECTION,
  CLOSE_CABIN_SELECTION,
  ADD_ADDITIONAL_GUEST,
  VERIFY_GUEST,
  REMOVE_GUEST,
  SET_SELECTION_STAGE,
} = actions;

export const CABIN_SELECTION_STAGES = {
  CABIN_SELECTION: 'CABIN_SELECTION',
  ADD_GUESTS: 'ADD_GUESTS',
  BED_SELECTION: 'BED_SELECTION',
};

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
    case SET_SELECTION_STAGE:
      return {
        ...state,
        currentStage: action.currentStage,
      };
  }
};

const getInitialState = ({ user }) => ({
  currentStage: CABIN_SELECTION_STAGES.CABIN_SELECTION,
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
