import { createAction, handleActions } from 'redux-actions';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, val }) => ({
  key,
  val,
}));

const initialState = {
  _id: '',
  title: '',
  tags: [],
  body: '',
  publishedDate: '',
  username: '',
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    // [INITIALIZE]: (state) => ({ ...state, initialState }), ==> 전상태의 state값이 계속 남아 있음
    [CHANGE_FIELD]: (state, { payload }) => ({
      ...state,
      [payload.key]: payload.val,
    }),
  },
  initialState,
);

export default write;
