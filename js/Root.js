import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './ShoeDawg';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import Splash from './Splash';

const { store, persistor } = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Splash />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}
