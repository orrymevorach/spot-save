import { bedList } from '@/components/shared/bedSelection/cabin/cabin';
import { useUser } from '@/context/user-context';
import { getRecordById } from '@/lib/airtable';
import { AIRTABLE_TABLES } from '@/utils/constants';
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
  selectedBeds: [],
  groupData: {
    id: '',
    members: [],
  },
  numberOfMembersNotConfirmedInCurrentCabin: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GROUP:
      return {
        ...state,
        groupData: action.groupData,
        numberOfMembersNotConfirmedInCurrentCabin:
          action.numberOfMembersNotConfirmedInCurrentCabin,
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

  const cabinQuery = router.query.id;

  // Used on reservation page
  useEffect(() => {
    const getCabinData = async () => {
      const cabinData = await getRecordById({
        recordId: cabinQuery,
        tableId: AIRTABLE_TABLES.OFFICES,
      });
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
      const cabinData = await getRecordById({
        recordId: user.cabin[0].id,
        tableId: AIRTABLE_TABLES.OFFICES,
      });
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
        if (cabinBed?.length) {
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

  const cabinData = useGetCabinData();
  useEffect(() => {
    if (user && !state.groupData.members.length && cabinData.cabin) {
      // Add group data on page load
      const hasGroup = user?.group && user.group[0];
      const groupData = hasGroup ? user.group[0] : { members: [user] };

      // numberOfMembersNotConfirmedInCurrentCabin helps with add guest logic.
      // Specfically in the scenario where members of the group are confirmed in a cabin, and others are added later to the same cabin as the rest of the group.
      const numberOfMembersNotConfirmedInCurrentCabin =
        groupData.members.filter(({ cabin }) => {
          const hasCabin = cabin?.length > 0;
          const hasDifferentCabin = hasCabin
            ? cabin[0].name !== cabinData.cabin.name
            : false;
          if (!hasCabin || hasDifferentCabin) return true;
          return false;
        }).length;

      dispatch({
        type: UPDATE_GROUP,
        groupData,
        numberOfMembersNotConfirmedInCurrentCabin,
      });
    }
  }, [user, state, cabinData]);

  useGetBeds({ cabinData, dispatch, actions });

  return {
    ...state,
    cabinData,
    dispatch,
    actions,
  };
};
