import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/header/Header";
import AsideNav from "./components/aside-nav/AsideNav";
import Dashboard from "./pages/dashboard/Dashboard"
import Error from './pages/error/Error';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
        <Header />
        <AsideNav />
        <Routes>
          <Route path="/" />
          <Route path="/user/:id" element={<Dashboard />} />
          <Route path="/error" element={<Error />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

