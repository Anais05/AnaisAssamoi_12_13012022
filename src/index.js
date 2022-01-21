
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/header/Header";
import AsideNav from "./components/aside-nav/AsideNav";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
        <Header />
        <AsideNav />
        <Routes>
          <Route path="/" />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

