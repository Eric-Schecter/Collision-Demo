import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './components';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
