import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';
import { ActionsTypes } from './global/actions';

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware, loggerMiddleware];

const appReducer = combineReducers({
  ...reducers
});

const rootReducer = (state, action) => {
  if (action.type === ActionsTypes.USER_SIGN_OUT_SUCCESS) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export { store };
