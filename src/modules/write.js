import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, val }) => ({
  key,
  val,
}));
// 현재 포스트 내용 가져오기
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

// 글쓰기
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST');

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.addPost);

// 글 수정
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('write/UPDATE_POST');

export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({
    id,
    title,
    body,
    tags,
  }),
);

const upadatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, upadatePostSaga);
}

const initialState = {
  title: '',
  tags: [],
  body: '',
  post: null,
  postError: null,
  originalPost: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    // [INITIALIZE]: (state) => ({ ...state, initialState }), ==> 전상태의 state값이 계속 남아 있음
    [CHANGE_FIELD]: (state, { payload }) => ({
      ...state,
      [payload.key]: payload.val,
    }),
    //post, postError 초기화
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      post: payload,
    }),
    [WRITE_POST_FAILURE]: (state, { payload }) => ({
      ...state,
      postError: payload,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      post: payload,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload }) => ({
      ...state,
      postError: payload,
    }),
    [SET_ORIGINAL_POST]: (state, { payload }) => ({
      ...state,
      title: payload.title,
      tags: payload.tags,
      body: payload.body,
      originalPost: payload._id,
    }),
  },
  initialState,
);

export default write;
