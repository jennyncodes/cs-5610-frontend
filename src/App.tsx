import React from 'react';
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import LandingPage from './LandingPage';

import './App.css';

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="LandingPage" />} />
      <Route path="/LandingPage/*" element={<LandingPage />} />
      <Route path="/Kanbas/*" element={<Kanbas />} />
      </Routes>
     
    </div>
    </Provider>
    </HashRouter>
  );
}

