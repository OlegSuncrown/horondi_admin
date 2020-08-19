import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import App from './components/app';
import configureStore from './store/store';
import { client } from './utils/client';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

if (window.Cypress) {
  window.store = configureStore;
}
