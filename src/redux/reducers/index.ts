import {combineReducers} from 'redux';

import tagsReducer from './tagsReducer';
import notesReducer from './notesReducer';

export default combineReducers({
  tagsReducer,
  notesReducer,
});
