import React, { useState } from 'react';

const InputPage = ({ addTransaction = () => {} }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      amount: parseFloat(amount),
      category,
      note,
      type,
    };
    addTransaction(newTransaction);

    setAmount('');
    setCategory('');
    setNote('');
    setSuccessMessage('Transaction successfully saved!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="p-6 px-4 md:px-16 lg:px-24">
      <h1 className="text-3xl text-center mb-6">Input Transaction</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type Selector */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            type="button"
            className={`py-2 px-4 ${type === 'income' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} border-2 border-black rounded-lg transition-colors duration-300 ease-in-out`}
            onClick={() => setType('income')}
          >
            Income
          </button>
          <button
            type="button"
            className={`py-2 px-4 ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'} border-2 border-black rounded-lg transition-colors duration-300 ease-in-out`}
            onClick={() => setType('expense')}
          >
            Expense
          </button>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          className="w-full px-10 py-5  border border-gray-700 bg-customBlack text-customYellow placeholder:text-customYellow placeholder:opacity-60 "
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Category Selector */}
        <div className="relative w-full">
          <select className="w-full px-10 py-5 border border-gray-700 bg-customBlack text-customYellow rounded-lg appearance-none" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="" disabled className="text-customYellow opacity-60">
              Categories
            </option>
            {type === 'income' ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Side Income">Side Income</option>
              </>
            ) : (
              <>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
              </>
            )}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <svg className="w-5 h-5 text-customYellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Note Input */}
        <input
          type="text"
          className="w-full px-10 py-5 border border-gray-700 bg-customBlack text-customYellow placeholder:text-customYellow placeholder:opacity-60 "
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className={`w-1/6 p-2 ${type === 'income' ? 'bg-blue-500' : 'bg-red-500'} text-white border-2 border-black rounded-lg transition-colors duration-300 ease-in-out`}>
            Save
          </button>
        </div>
      </form>
      {successMessage && <p className="text-center text-green-950 mt-4">{successMessage}</p>}
    </div>
  );
};

export default InputPage;
