import {combineReducers} from 'redux';

import tagsReducer from './tagsReducer';
import notesReducer from './notesReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
  tagsReducer,
  notesReducer,
  tasksReducer,
});
