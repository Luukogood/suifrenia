import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WalletProvider } from '@suiet/wallet-kit';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
    <React.StrictMode>
      <WalletProvider>
        <App />
      </WalletProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
