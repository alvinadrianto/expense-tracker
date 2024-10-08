import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const HomePage = ({ transactions = [] }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  }, [transactions]);

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Expense',
        data: Array.from({ length: 12 }, (_, month) => transactions.filter((t) => t.type === 'expense' && new Date(t.date).getMonth() === month).reduce((acc, t) => acc + parseFloat(t.amount), 0)),
        borderColor: '#fcd34d',
        backgroundColor: 'rgba(252, 211, 77, 0.2)',
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Food', 'Transport', 'Entertainment'],
    datasets: [
      {
        label: 'Expense Category',
        data: [
          transactions.filter((t) => t.type === 'expense' && t.category === 'Food').length,
          transactions.filter((t) => t.type === 'expense' && t.category === 'Transport').length,
          transactions.filter((t) => t.type === 'expense' && t.category === 'Entertainment').length,
        ],
        backgroundColor: ['#f87171', '#60a5fa', '#fbbf24', '#34d399'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl mb-6 text-center">Expense Tracker</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Balance, Income, and Expense Boxes */}
        <div className="bg-customBlack text-customYellow p-4">
          <p>Your Balance</p>
          <h2 className="text-2xl">Rp {balance}</h2>
        </div>
        <div className="bg-customBlack text-customYellow p-4">
          <p>Your Income</p>
          <h2 className="text-2xl">Rp {income}</h2>
        </div>
        <div className="bg-customBlack text-customYellow p-4">
          <p>Your Expense</p>
          <h2 className="text-2xl">Rp {expense}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Monthly Expense and Category Graph */}
        <div className="bg-customBlack text-customYellow p-4">
          <p>Monthly Expense</p>
          <div className="h-64 mt-4">
            <Bar data={lineData} />
          </div>
        </div>
        <div className="bg-customBlack text-customYellow p-4">
          <p>Expense Category</p>
          <div className="h-64 mt-4">
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Biggest Expense, Average Expense, and Most Wasteful Category */}
        <div className="bg-customBlack text-customYellow p-4 text-center">
          <p>Biggest Expense in one month</p>
          <h2 className="text-2xl font-bold">Rp {Math.max(...transactions.filter((t) => t.type === 'expense').map((t) => parseFloat(t.amount)), 0)}</h2>
        </div>
        <div className="bg-customBlack text-customYellow p-4 text-center">
          <p>Average expense per day</p>
          <h2 className="text-2xl font-bold">
            Rp {transactions.filter((t) => t.type === 'expense').length > 0 ? Math.round(expense / transactions.filter((t) => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth()).length) : 0}
          </h2>
        </div>
        <div className="bg-customBlack text-customYellow p-4 text-center">
          <p>Most wasteful category</p>
          <h2 className="text-2xl font-bold">
            {['Food', 'Transport', 'Entertainment'].reduce((a, b) => (transactions.filter((t) => t.type === 'expense' && t.category === a).length > transactions.filter((t) => t.type === 'expense' && t.category === b).length ? a : b))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
