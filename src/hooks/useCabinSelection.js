import { useUser } from '@/context/user-context';
const { useReducer, useEffect } = require('react');

const actions = {
  OPEN_CABIN_SELECTION: 'OPEN_CABIN_SELECTION',
  CLOSE_CABIN_SELECTION: 'CLOSE_CABIN_SELECTION',
  REMOVE_GUEST: 'REMOVE_GUEST',
  VERIFY_GUEST: 'VERIFY_GUEST',
  SET_SELECTION_STAGE: 'SET_SELECTION_STAGE',
};

const {
  OPEN_CABIN_SELECTION,
  CLOSE_CABIN_SELECTION,
  VERIFY_GUEST,
  REMOVE_GUEST,
  SET_SELECTION_STAGE,
} = actions;

export const CABIN_SELECTION_STAGES = {
  CABIN_SELECTION: 'CABIN_SELECTION',
  ADD_GUESTS: 'ADD_GUESTS',
  BED_SELECTION: 'BED_SELECTION',
  CHECKOUT: 'CHECKOUT',
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
        currentStage: CABIN_SELECTION_STAGES.CABIN_SELECTION,
      };
    case REMOVE_GUEST:
      return {
        ...state,
        verifiedEmails: action.verifiedEmails,
        verifiedUsers: action.verifiedUsers,
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

const initialState = {
  currentStage: CABIN_SELECTION_STAGES.CABIN_SELECTION,
  selectedCabin: null,
  showTakeover: false,
  verifiedEmails: [], // used to verify users
  verifiedUsers: [], // used to display user names after verification
};

export const useCabinSelectionReducer = () => {
  const user = useUser();
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
