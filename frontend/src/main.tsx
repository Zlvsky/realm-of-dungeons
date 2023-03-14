import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import { store } from "./redux/store";

import Router from "./Router";

import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router />
    </Provider>
  </React.StrictMode>
);
