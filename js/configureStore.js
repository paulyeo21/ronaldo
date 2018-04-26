import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './data/reducer';
 
const loggerMiddleware = createLogger();

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      loggerMiddleware
    ),
  )
);

export default store;
