import { useUser } from '@/context/user-context';
import { getCabin } from '@/lib/airtable';
import { useRouter } from 'next/router';
const { useReducer, useEffect, useState } = require('react');

const actions = {
  ADD_GUEST: 'ADD_GUEST',
  REMOVE_GUEST: 'REMOVE_GUEST',
  SET_SELECTION_STAGE: 'SET_SELECTION_STAGE',
  SELECT_BEDS: 'SELECT_BEDS',
};

const { ADD_GUEST, REMOVE_GUEST, SET_SELECTION_STAGE, SELECT_BEDS } = actions;

export const CABIN_SELECTION_STAGES = {
  ADD_GUESTS: 'ADD_GUESTS',
  CONFIRMATION: 'CONFIRMATION',
  BED_SELECTION: 'BED_SELECTION',
};

const initialState = {
  currentStage: '',
  selectedCabin: null,
  selectedBeds: [],
  groupData: {
    id: '',
    members: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_GUEST:
      return {
        ...state,
        groupData: action.groupData,
      };
    // case REMOVE_GUEST:
    //   return {
    //     ...state,
    //     verifiedEmails: action.verifiedEmails,
    //     verifiedUsers: action.verifiedUsers,
    //   };
    case SET_SELECTION_STAGE:
      return {
        ...state,
        currentStage: action.currentStage,
      };
    case SELECT_BEDS:
      return {
        ...state,
        selectedBeds: action.selectedBeds,
      };
  }
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

  // Add group data on page load
  useEffect(() => {
    if (user && !state.groupData.members.length) {
      const hasGroup = user?.group && user.group[0];
      const groupData = hasGroup ? user.group[0] : { members: [user] };
      dispatch({
        type: ADD_GUEST,
        groupData,
      });
    }
  }, [user, state]);

  const cabinData = useGetCabinData();

  return {
    ...state,
    cabinData,
    dispatch,
    actions,
  };
};
