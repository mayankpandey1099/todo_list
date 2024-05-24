import React, { useEffect } from "react";
import useFetchExpenses from "../hooks/useFetchExpenses";
import { useSelector, useDispatch } from "react-redux";
import { setModalStateUpdate } from "../../utils/ModalSlice";
import { setExpenseId } from "../../utils/ListSlice";

const PaginatedList = () => {
  const { handlePrevPage, handleNextPage, handleDeleteExpense } =
    useFetchExpenses();

  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.expenses);
  const currentPages = useSelector((state) => state.expense.currentPages);
  const totalPages = useSelector((state) => state.expense.totalPages);

  useEffect(() => {}, [expenses]);

  const handleUpdateExpense = (id) => {
    dispatch(setModalStateUpdate(true));
    dispatch(setExpenseId(id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center border-b-1 shadow-md pb-4 pt-4 bg-slate-400 rounded-t-lg">
        Expense Report
      </h2>
      {expenses.length > 0 ? (
        <>
          <ul className="mt-4">
            <li className="grid grid-cols-4 gap-4 items-center bg-white rounded-md shadow-md p-5 ml-4 mr-4 text-lg">
              <span className="font-bold text-center">Name</span>
              <span className="font-bold text-center">Quantity</span>
              <span className="font-bold text-center">Amount</span>
              <span className="font-bold text-center">Actions</span>
            </li>
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="grid grid-cols-4 gap-4 items-center bg-white rounded-md shadow-md p-2 mt-2 text-center ml-4 mr-4 font-semibold"
              >
                <span>{expense.name}</span>
                <span>{expense.quantity}</span>
                <span>₹{expense.amount}</span>
                <div>
                  <button
                    className="ml-2 px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                    onClick={() => handleUpdateExpense(expense.id)}
                  >
                    Update
                  </button>
                  <button
                    className="ml-2 px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            {currentPages > 1 && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                onClick={handlePrevPage}
              >
                &lt;
              </button>
            )}
            <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2">
              {currentPages} / {totalPages}
            </span>
            {currentPages < totalPages && (
              <button
                className="px-4 py-2 bg-slate-400 hover:bg-slate-600 text-white rounded-md ml-2"
                onClick={handleNextPage}
              >
                &gt;
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center mt-4">Your list is empty.</p>
      )}
    </div>
  );
};

export default PaginatedList;
