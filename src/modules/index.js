import { combineReducers } from 'redux';
import userReducer from './user';
import photoReducer from './photos';

export default combineReducers({
  user: userReducer,
  photo: photoReducer,
});