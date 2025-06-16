import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [LIST_POST, LIST_POST_SUCCESS, LIST_POST_FAILURE] =
  createRequestActionTypes('posts/LIST_POST');

export const listPosts = createAction(LIST_POST, ({ page, tag, username }) => ({
  page,
  tag,
  username,
}));

const listPostSaga = createRequestSaga(LIST_POST, postAPI.listPosts);

export function* listSaga() {
  yield takeLatest(LIST_POST, listPostSaga);
}

const initialState = {
  posts: null,
  postsError: null,
  lastPage: 1,
};

const list = handleActions(
  {
    [LIST_POST_SUCCESS]: (state, { payload: posts, meta: res }) => ({
      ...state,
      posts: posts,
      lastPage: parseInt(res.headers['last-page'], 10), // 문자열을 숫자로 변환
    }),
    [LIST_POST_FAILURE]: (state, { payload: postsError }) => ({
      ...state,
      posts: postsError,
    }),
  },
  initialState,
);

export default list;
