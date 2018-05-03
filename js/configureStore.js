import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as dataReducer } from './data/reducer';
import { reducer as servicesReducer } from './services/reducer';
 
const loggerMiddleware = createLogger();

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const rootReducer = combineReducers({
  data: dataReducer,
  services: servicesReducer,
});

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
