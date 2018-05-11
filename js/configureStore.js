import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as dataReducer } from './data/reducer';
import { reducer as servicesReducer } from './services/reducer';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createFilter from 'redux-persist-transform-filter';

const rootReducer = combineReducers({
  data: dataReducer,
  services: servicesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['data'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      loggerMiddleware
    ),
  ),
);
let persistor = persistStore(store);

export default () => {
  return { store, persistor };
}
