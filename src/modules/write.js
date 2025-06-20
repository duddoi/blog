import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, val }) => ({
  key,
  val,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

const initialState = {
  _id: '',
  title: '',
  tags: [],
  body: '',
  publishedDate: '',
  username: '',
  originalPost: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload }) => ({
      ...state,
      [payload.key]: payload.val,
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
