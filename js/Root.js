import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ShoeDawg from './ShoeDawg';
import store from './configureStore';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <ShoeDawg />
      </Provider>
    );
  }
}
