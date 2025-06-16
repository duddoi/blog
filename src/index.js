import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return [thunk, sagaMiddleware];
  },
});
sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working@@');
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
