import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import Transaction from './transaction/Transaction';

const App: React.FC = () => {
  return <Router>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/tx/:txId' Component={Transaction} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
}

export default App;
