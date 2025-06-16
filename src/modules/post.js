import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

export const readPost = createAction(READ_POST, (id) => id);
export const unloadPost = createAction(UNLOAD_POST); // 페이지를 벗어나 다시 돌아올때 전 상태(포스트)를 비우는 용도, 전상태가 아직 남아 있다면 깜빡임 현상

const readPostSaga = createRequestSaga(READ_POST, postAPI.readPost);

export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post: post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error: error,
    }),
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
);

export default post;
