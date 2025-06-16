import auth, { authSaga } from './auth';
import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import list, { listSaga } from './list';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  list,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), listSaga()]);
}

export default rootReducer;
