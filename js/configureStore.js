import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
// Note: createReactNavigationReduxMiddleware must be run before createNavigationPropConstructor
const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

export const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      navMiddleware
    )
  )
);

export const persistor = persistStore(store);
