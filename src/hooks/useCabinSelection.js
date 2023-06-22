import { useUser } from '@/context/user-context';
const { useReducer } = require('react');

const actions = {
  OPEN_CABIN_SELECTION: 'OPEN_CABIN_SELECTION',
  CLOSE_CABIN_SELECTION: 'CLOSE_CABIN_SELECTION',
};

const { OPEN_CABIN_SELECTION, CLOSE_CABIN_SELECTION } = actions;

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
  }
};

const initialState = {
  selectedCabin: null,
  showTakeover: false,
};

export const useCabinSelectionReducer = () => {
  const { user } = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,
    dispatch,
    actions,
  };
};
