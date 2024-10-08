import React from 'react';

const HistoryPage = ({ transactions = [] }) => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl text-center mb-6">Transaction History</h1>

      <table className="min-w-full table-auto bg-customBlack text-white border-collapse border border-gray-700 text-sm overflow-x-auto">
        <thead>
          <tr className="text-customYellow border border-gray-700">
            <th className="p-2 border border-gray-700">Date</th>
            <th className="p-2 border border-gray-700">Category</th>
            <th className="p-2 border border-gray-700">Amount</th>
            <th className="p-2 border border-gray-700">Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((transaction) => (
              <tr key={transaction.id} className="border border-gray-700">
                <td className="p-2 border border-gray-700">{transaction.date}</td>
                <td className="p-2 border border-gray-700">{transaction.category}</td>
                <td className="p-2 border border-gray-700">{transaction.amount}</td>
                <td className="p-2 border border-gray-700">{transaction.type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
