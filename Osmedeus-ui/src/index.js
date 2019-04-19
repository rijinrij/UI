import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './modules/MainRouter';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import sessStore from './store/sessStore';
import axiosStore from './store/axiosStore';

const stores = {
  sessStore,
  axiosStore,
};

// eslint-disable-next-line no-undef
ReactDOM.render((
  <Provider {...stores}>
    <MainRouter />
  </Provider>
  
), document.getElementById('app-root'));
