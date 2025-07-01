import { createAction, handleActions } from 'redux-actions';

const user = JSON.parse(localStorage.getItem('User'));

const LOGIN_STATUS = 'auth/LOGIN_STATUS';
export const loginStatus = createAction(LOGIN_STATUS, (user) => user);

const initialState = {
  auth: user,
};

const auth = handleActions(
  {
    [LOGIN_STATUS]: (state, { payload }) => ({
      ...state,
      auth: payload,
    }),
  },
  initialState,
);
export default auth;
