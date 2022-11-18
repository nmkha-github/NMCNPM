import React from 'react';
import ReactDOM from 'react-dom/client';
import AppSnackbarProvider from './lib/provider/AppSnackBarProvider';
import RoomsProvider from './lib/provider/RoomsProvider';
import AppRoutes from './AppRoutes';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppSnackbarProvider>
      <RoomsProvider>
        <AppRoutes/>
      </RoomsProvider>
    </AppSnackbarProvider>
  </React.StrictMode>
);
