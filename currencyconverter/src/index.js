import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import "./css/index.css";
import { ConvPage } from "./converter.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='App'>
      <h1>Currency converter with CORS server</h1>
      <ConvPage/>
    </div>
  </React.StrictMode>
);