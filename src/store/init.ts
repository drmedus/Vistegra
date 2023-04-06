import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './sagas/rootSaga';
import { rootReducer } from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
