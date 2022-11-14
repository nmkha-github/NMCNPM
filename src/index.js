import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppSnackbarProvider from './lib/provider/AppSnackBarProvider';
import HomePage from './pages/HomePage/HomePage';
import WorkPage from './pages/WorkPage/WorkPage';
import RoomPage from './pages/RoomPage/RoomPage';
import RoomsProvider from './modules/home/provider/RoomsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppSnackbarProvider>
        <RoomsProvider>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="home" element={<HomePage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="room" element={<RoomPage />} />
          </Routes>
        </RoomsProvider>
      </AppSnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
