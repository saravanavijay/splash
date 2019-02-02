import axios from 'axios';
import { APP_URI } from '../config';
import AuthHeaders from './header';

const apiEndpoints = {
  GET_USER_PHOTOS: (username) => `${APP_URI}/users/${username}/photos`,
};

// ------------------------------------
// Constants
// ------------------------------------
export const GOT_PHOTOS_FOR_USER = 'GOT_PHOTOS_FOR_USER';

// ------------------------------------
// Actions
// ------------------------------------

const gotPhotosForUser = (props) => ({
  type: GOT_PHOTOS_FOR_USER,
  photos: props.photos,
});


export const actions = {
  gotPhotosForUser,
};

// ------------------------------------
// API Wrapper
// ------------------------------------

export const getPhotosForUser = (props) => {
  return async (dispatch) => {
    try {
      const { username } = props;
      const res = await axios.get(
        apiEndpoints.GET_USER_PHOTOS(username),
        AuthHeaders(),
      );
      const result = res.data;
      if (result) {
        dispatch(actions.gotPhotosForUser({ photos: result }));
      }
    } catch (error) {

    }
  }
};

// ------------------------------------
// Reducers
// ------------------------------------

export default (state = {}, action) => {
  switch (action.type) {
    case GOT_PHOTOS_FOR_USER:
      {
        const records = state.records || {};
        const photos = action.photos || [];
        photos.forEach((photo) => {
          if (!records[photo.id]) {
            records[photo.id] = photo;
          }
        });
        return { ...state, records: { ...records }, error: null };
      }
    default:
      return state;
  }
};