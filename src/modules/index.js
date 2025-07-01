import { combineReducers } from 'redux';
import write from './write';
import auth from './auth';

const rootReducer = combineReducers({
  write,
  auth,
});

export default rootReducer;
