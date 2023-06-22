import { useUser } from '@/context/user-context';
import { getCabin } from '@/lib/airtable';
import { useRouter } from 'next/router';
const { useReducer, useEffect, useState } = require('react');

const actions = {
  ADD_GUEST: 'ADD_GUEST',
  REMOVE_GUEST: 'REMOVE_GUEST',
  SET_SELECTION_STAGE: 'SET_SELECTION_STAGE',
};

const { ADD_GUEST, REMOVE_GUEST, SET_SELECTION_STAGE } = actions;

export const CABIN_SELECTION_STAGES = {
  ADD_GUESTS: 'ADD_GUESTS',
  CONFIRMATION: 'CONFIRMATION',
  BED_SELECTION: 'BED_SELECTION',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_GUEST:
      return {
        ...state,
        verifiedEmails: action.verifiedEmails,
        verifiedUsers: action.verifiedUsers,
      };
    case REMOVE_GUEST:
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
  currentStage: CABIN_SELECTION_STAGES.ADD_GUESTS,
  selectedCabin: null,
  verifiedEmails: [], // used to verify users
  verifiedUsers: [], // used to display user names after verification
};

const useGetCabinData = () => {
  const [cabin, setCabin] = useState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const cabinQuery = router.query.cabin;

  useEffect(() => {
    const getCabinData = async () => {
      const cabinData = await getCabin({ cabinName: cabinQuery });
      setCabin(cabinData);
      setIsLoading(false);
      return;
    };
    if (cabinQuery && !cabin) {
      getCabinData();
    }
  }, [cabinQuery, cabin]);
  return {
    cabin,
    isLoading,
  };
};

export const useReservationReducer = () => {
  const { user } = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Add current user on page load
  useEffect(() => {
    if (user && !state.verifiedEmails.length) {
      dispatch({
        type: ADD_GUEST,
        verifiedEmails: [user.emailAddress],
        verifiedUsers: [user],
      });
    }
  }, [user, state.verifiedEmails]);

  const cabinData = useGetCabinData();

  return {
    ...state,
    cabinData,
    dispatch,
    actions,
  };
};
