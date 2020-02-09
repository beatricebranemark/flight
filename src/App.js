import React from 'react';
import "./css/style.css";
import firebaseConfig from './config/firebase';
//import * as firebase from 'firebase/app';

function App() {

  const firebase = require('firebase/app');
  firebase.initializeApp(firebaseConfig);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          FLIGHT DATA
        </p>
      </header>
    </div>
  );
}

export default App;
