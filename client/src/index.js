import React from 'react';
import ReactDOM from 'react-dom';

// react-router-dom
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

