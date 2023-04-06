import { all } from 'redux-saga/effects';

import { dataRootSaga } from './dataSaga';
import { configRootSaga } from './configSaga';

export function* rootSaga() {
  try {
    yield all([dataRootSaga(), configRootSaga()]);
  } catch (e) {
    // Логгер либо любой другой механизм обработки исключений.
    // В нашем случае лог для простоты.
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
