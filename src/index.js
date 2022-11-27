import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './lib/provider/AuthProvider';
import AppSnackbarProvider from './lib/provider/AppSnackBarProvider';
import RoomsProvider from './lib/provider/RoomsProvider';
import AppRoutes from './AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppSnackbarProvider>
          <RoomsProvider>
            <AppRoutes/>
          </RoomsProvider>
        </AppSnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);