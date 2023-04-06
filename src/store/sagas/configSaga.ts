import { SagaIterator } from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import config from '../../mockData/config.json';

import {
  requestConfig, requestConfigFailure, requestConfigSuccess, setConfig,
} from '../slices/config/actions';
import { IConfig } from '../../types';

export function* getConfigSaga() {
  try {
    // На этом этапе мы обратимся к сервису транспортного слоя, который вернет данные.
    // В нашем случае - возвращаем готовый json.
    const res: Array<IConfig> = yield call(() => JSON.parse(JSON.stringify(config)));
    yield put(setConfig(res));
    yield put(requestConfigSuccess());
  } catch {
    yield put(requestConfigFailure());
  }
}

export function* configRootSaga(): SagaIterator {
  yield takeEvery(requestConfig, getConfigSaga);
}
