import { bedList } from '@/components/shared/bedSelection/cabin/cabin';
import { useUser } from '@/context/user-context';
import { getCabin } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { useReducer, useEffect, useState } from 'react';

const actions = {
  UPDATE_GROUP: 'UPDATE_GROUP',
  SET_SELECTION_STAGE: 'SET_SELECTION_STAGE',
  SELECT_BEDS: 'SELECT_BEDS',
};

const { UPDATE_GROUP, SET_SELECTION_STAGE, SELECT_BEDS } = actions;

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
    case UPDATE_GROUP:
      return {
        ...state,
        groupData: action.groupData,
      };
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
  const { user } = useUser();

  const cabinQuery = router.query.cabin;

  // Used on reservation page
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

  // Used on summary page
  useEffect(() => {
    const getCabinData = async () => {
      const cabinData = await getCabin({ cabinName: user.cabin[0].name });
      setCabin(cabinData);
      setIsLoading(false);
      return;
    };
    const hasCabin = user?.cabin && user?.cabin[0];
    if (!cabinQuery && !cabin && hasCabin) {
      getCabinData();
    }
  }, [user, cabin, cabinQuery]);

  return {
    cabin,
    isLoading,
  };
};

const useGetBeds = ({ cabinData, dispatch, actions }) => {
  const [isGetting, setIsGetting] = useState(true);

  useEffect(() => {
    const getBeds = () => {
      const selectedBeds = [];
      for (let i = 0; i < bedList.length; i++) {
        const bedName = bedList[i];
        const cabinBed = cabinData.cabin[bedName];
        if (cabinBed.length) {
          const bedData = cabinBed[0];
          selectedBeds.push({
            bedName,
            ...bedData,
          });
        }
      }
      dispatch({ type: actions.SELECT_BEDS, selectedBeds });
      setIsGetting(false);
    };
    if (cabinData?.cabin && isGetting) {
      getBeds();
    }
  }, [cabinData, isGetting, actions, dispatch]);
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
        type: UPDATE_GROUP,
        groupData,
      });
    }
  }, [user, state]);

  const cabinData = useGetCabinData();

  useGetBeds({ cabinData: state.cabinData, dispatch, actions });

  return {
    ...state,
    cabinData,
    dispatch,
    actions,
  };
};
