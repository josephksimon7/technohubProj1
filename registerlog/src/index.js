import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='903446393348-bltqjjlf6u17l7psn6niigdn4e0j8854.apps.googleusercontent.com'>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);



