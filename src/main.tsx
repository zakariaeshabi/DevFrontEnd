import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import App from './App';
import { store, type RootState } from './store';
import { setAuthToken } from './api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function AuthTokenBridge() {
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthTokenBridge />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
