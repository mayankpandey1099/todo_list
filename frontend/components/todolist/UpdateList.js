import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useFetchExpenses from "../hooks/useFetchExpenses";
import { setModalStateUpdate } from "../../utils/ModalSlice";
import { setExpenseId } from "../../utils/ListSlice";

const UpdateExpenseModal = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { fetchExpenses } = useFetchExpenses();

  const showModal = useSelector((state) => state.modal.showModalUpdate);
  const currentPages = useSelector((state) => state.expense.currentPages);
  const expenseId = useSelector((state) => state.expense.expenseId);
  const token = useSelector((state) => state.auth.isToken);

  const dispatch = useDispatch();

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
      await axios.put(
        `http://localhost:3000/expense/${expenseId}`,
        { amount, name, quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      dispatch(fetchExpenses(currentPages));
    } catch (error) {
      console.error("Error occurred while storing data", error);
    }

    setName("");
    setQuantity("");
    setAmount("");
    setError("");

    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(setExpenseId(null));
    dispatch(setModalStateUpdate(false));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value.trim()) {
      setError("");
    }
  };

  return (
    showModal && (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div
          className="bg-white rounded-lg"
          style={{ width: "25%", height: "35%" }}
        >
          <div className="flex justify-between bg-slate-400 shadow-md rounded-t-lg p-4">
            <h2 className="text-lg font-bold text-center border-b-1">
              Update Your Expenses
            </h2>
            <button
              className="text-gray-600 hover:text-gray-800 text-xl"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 rounded-lg h-full"
          >
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              className="ml-6 mb-3 mr-3 mt-8 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="ml-6 mb-3 mr-3 mt-3 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="ml-6 mr-3 mt-3 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            >
              Update Expense
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateExpenseModal;
