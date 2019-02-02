import axios from 'axios';
import { APP_URI } from '../config';
import AuthHeaders from './header';

const apiEndpoints = {
  SEARCH_USER: `${APP_URI}/search/users`,
};


// ------------------------------------
// Constants
// ------------------------------------
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const USER_SELECTED = 'USER_SELECTED';

// ------------------------------------
// Actions
// ------------------------------------

const searchUserSuccess = (props) => ({
  type: SEARCH_USER_SUCCESS,
  users: props.users,
});

const selectUser = (props) => ({
  type: USER_SELECTED,
  user: props.user,
});

export const actions = {
  searchUserSuccess,
  selectUser,
};


// ------------------------------------
// API Wrapper
// ------------------------------------

export const searchForUsers = (props) => {
  return async (dispatch) => {
    try {
      const { query } = props;
      const res = await axios.get(
        `${apiEndpoints.SEARCH_USER}?query=${query}`,
        AuthHeaders(),
      );
      const result = res.data;
      if (result && result.results) {
        dispatch(actions.searchUserSuccess({ users: result.results }));
      }
    } catch (error) {

    }
  }
};

// ------------------------------------
// Reducers
// ------------------------------------

export default (state = { selectedUser: null }, action) => {
  switch (action.type) {
    case SEARCH_USER_SUCCESS:
      {
        const records = state.records || {};
        const users = action.users || [];
        users.forEach((user) => {
          if (!records[user.id]) {
            records[user.id] = user;
          }
        });
        return { ...state, records: { ...records }, error: null };
      }
    case USER_SELECTED:
    {
      // const { selectedUser } = state;
      // if (selectedUser && sel)
      return {...state, selectedUser: action.user };
    }
    default:
      return state;
  }
};
