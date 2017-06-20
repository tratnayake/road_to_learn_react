import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if(module.hot) {
  module.hot.accept()
}
// ReactDOM.render(<h1>AYYLMAO</h1>, document.getElementById('root'));
// registerServiceWorker();
