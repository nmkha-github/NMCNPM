import React from 'react';
import ReactDOM from 'react-dom/client';
import AppSnackbarProvider from './lib/provider/AppSnackBarProvider';
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './lib/provider/AuthProvider';
import RoomsProvider from './lib/provider/RoomsProvider';
import Header from './lib/components/Header/Header'
import UserProvider from './lib/provider/UserProvider';
import AppRoutes from './AppRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppSnackbarProvider>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <Header>
              <RoomsProvider>
                <AppRoutes/>
              </RoomsProvider>
            </Header>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </AppSnackbarProvider>
  </React.StrictMode>
);