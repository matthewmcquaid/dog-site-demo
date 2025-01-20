import React from 'react';
import logo from './dog.svg';
import './App.css';
import Dashboard from './components/Dashboard.js';

function App() {
  

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div className='App-header'>DOGS!</div>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;