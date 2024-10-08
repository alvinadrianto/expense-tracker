import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InputPage from './pages/InputPage';
import HistoryPage from './pages/HistoryPage';
import Navbar from './components/Navbar';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };
  return (
    <Router>
      <div className="pb-24 bg-customYellow font-ibm-plex-mono min-h-screen px-0 md:px-14">
        {' '}
        {/* Menambahkan padding agar konten tidak tertutupi navbar */}
        <Routes>
          <Route path="/" element={<HomePage transactions={transactions} />} />
          <Route path="/input" element={<InputPage addTransaction={addTransaction} />} />
          <Route path="/history" element={<HistoryPage transactions={transactions} />} />
        </Routes>
      </div>
      <Navbar /> {/* Navbar di bawah */}
    </Router>
  );
}

export default App;
