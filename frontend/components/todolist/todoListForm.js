import React, { useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import useFetchExpenses from "../hooks/useFetchExpenses";

const ExpenseForm = () => {
  const {fetchExpenses} = useFetchExpenses();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");


  const currentPages = useSelector((state)=> state.expense.currentPages);
  const token  = useSelector((state)=> state.auth.isToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !quantity.trim() || !amount.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (/\d/.test(name)) {
      setError("Name should not contain any numbers.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/expense`,
        { amount, name, quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      await fetchExpenses(currentPages);

    } catch (error) {
      console.error("Error occurred while storing data", error);
    }

    setName("");
    setQuantity("");
    setAmount("");
    setError("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value.trim()) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg">
      <h2 className="text-lg font-bold text-center border-b-1 shadow-md pb-4 pt-4 bg-slate-400 rounded-t-lg">
        Add Your Expenses
      </h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        className="ml-4 mb-3 mr-3 mt-8 p-3 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="ml-4 mb-3 mr-3 mt-3 p-3 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="ml-4 mr-3 mt-3 p-3 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
