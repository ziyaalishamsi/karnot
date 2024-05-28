import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className='AppBody'>
        <Header />
        <Filter />
        <Table />
      </div>
    </div>
  );
}

export default App;
