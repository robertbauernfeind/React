import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import "./css/index.css";
import { ConvPage } from "./converter.js";
import { ConvPageRemake } from "./converterRemake.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='App'>
      <h1>Currency converter with Node.JS server</h1>
      <ConvPage/>
      <ConvPageRemake/>
    </div>
  </React.StrictMode>
);
