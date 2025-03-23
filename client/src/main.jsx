import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { OrdersProvider } from './context/OrdersContext.jsx';
import { ServicesProvider } from './context/ServicesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ServicesProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </ServicesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
