import React from 'react';
import { BrowserRouter } from "react-router-dom";
import firebaseConfig from '../config/firebase';

import Router from "./Router";

import "../css/style.css";


function App() {

  const firebase = require('firebase/app');
  firebase.initializeApp(firebaseConfig);

  return (
      <BrowserRouter>
            <div className="App">
              <Router />
            </div>
    </BrowserRouter>
  );
}

export default App;
