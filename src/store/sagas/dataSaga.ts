import { SagaIterator } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import data from '../../mockData/data.json';

import {
  requestData, requestDataFailure, requestDataSuccess, setData,
} from '../slices/data/actions';
import { IData } from '../../types/data';

export function* getDataSaga() {
  try {
    // На этом этапе мы обратимся к сервису транспортного слоя, который вернет данные.
    // В нашем случае - возвращаем готовый json.
    const res: Array<IData> = yield call(() => JSON.parse(JSON.stringify(data)));
    yield put(setData(res));
    yield put(requestDataSuccess());
  } catch {
    yield put(requestDataFailure());
  }
}

export function* dataRootSaga(): SagaIterator {
  yield takeEvery(requestData, getDataSaga);
}
