import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export function createRequestActionTypes(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
}

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    yield put(startLoading(type));
    try {
      const res = yield call(request, action.payload);

      yield put({
        type: SUCCESS,
        payload: res.data,
        meta: res,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
      // yield put(finishLoading(type));
      // throw e; => !!! 될수록 사용하지 말 것!!! 강제로 에러 발생 시킴!! 비동기 작업이 중단되어 다음에 오는 요청을 수행할 수 없게 된다.
    }

    yield put(finishLoading(type));
  };
}
