import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Ronaldo from './Ronaldo';
import { store, persistor } from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import Splash from './Splash';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Splash />} persistor={persistor}>
          <Ronaldo />
        </PersistGate>
      </Provider>
    );
  }
}
