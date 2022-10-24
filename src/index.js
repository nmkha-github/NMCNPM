import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import WorkPage from './pages/WorkPage/WorkPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="home" element={<HomePage />} />
        <Route path="work" element={<WorkPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
