import { getUserByRecordId } from '@/lib/airtable';
import { COOKIES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { useEffect, useReducer } from 'react';

const actions = {
  INIT_LOGIN: 'INIT_LOGIN',
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};

const { INIT_LOG_IN, LOG_IN, LOG_OUT } = actions;

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_LOG_IN:
      return {
        ...state,
        isLoading: true,
      };
    case LOG_IN:
      return {
        ...state,
        user: action.userData,
        isLoading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
  }
};

const initialState = {
  user: null,
  isLoading: false,
};

export default function useUserReducer() {
  const userRecordCookie = Cookies.get(COOKIES.USER_RECORD);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      dispatch({ type: actions.INIT_LOGIN });
      const userData = await getUserByRecordId({ id: userRecordCookie });
      dispatch({ type: actions.LOG_IN, userData });
    };
    if (userRecordCookie) {
      loadUser();
    }
  }, [userRecordCookie, dispatch]);

  return {
    ...state,
    dispatch,
    actions,
  };
}
