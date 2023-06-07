const { useReducer } = require('react');

const actions = {
  OPEN_CABIN_SELECTION: 'OPEN_CABIN_SELECTION',
  CLOSE_CABIN_SELECTION: 'CLOSE_CABIN_SELECTION',
  ADD_ADDITIONAL_GUEST: 'ADD_ADDITIONAL_GUEST',
  VERIFY_GUEST: 'VERIFY_GUEST',
};

const {
  OPEN_CABIN_SELECTION,
  CLOSE_CABIN_SELECTION,
  ADD_ADDITIONAL_GUEST,
  VERIFY_GUEST,
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
        numberOfGuestsInReservation: 2,
      };
    case VERIFY_GUEST:
      return {
        ...state,
        verifiedEmails: action.verifiedEmails,
      };
  }
};

const initialState = {
  selectedCabin: null,
  showTakeover: false,
  numberOfGuestsInReservation: 1,
  verifiedEmails: [],
};

export const useCabinSelectionReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    ...state,
    dispatch,
    actions,
  };
};
