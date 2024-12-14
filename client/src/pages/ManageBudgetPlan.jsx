// libraries
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//context
import { AppContext } from "../context/AppContext";

// components
import BudgetCard from "../components/BudgetCard";
import ExpenseCard from "../components/ExpenseCard";

//utils
import remainingBudgetHelper from "../utils/remainingBudgetHelper";
import addBudgetExpense from "../utils/addBudgetExpense";
import getBudgetPlan from "../utils/getBudgetPlan";
import deleteBudgetExpense from "../utils/deleteBudgetExpense";
import updateBudgetExpense from "../utils/updateBudgetExpense";

const ManageBudgetPlan = ({ budgetPlan, setBudgetPlan }) => {
  const { isDisabled, setIsDisabled } = useContext(AppContext);

  // const [budgets, setBudgets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedType, setSelectedType] = useState("budget");
  const [remainingBudget, setRemainingBudget] = useState("");
  const [entry, setEntry] = useState({
    detail: "",
    amount: "",
  });
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    setRemainingBudget(remainingBudgetHelper(budgetPlan));
  }, [budgetPlan]);

  const handleDropdownChange = (event) => {
    setSelectedType(event.target.value);
    setEntry({ detail: "", amount: "" });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setEntry((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEdit = (item) => {
    setSelectedType(item.type);
    if (item.type === "budget") {
      setEntry({ detail: item.budget.source, amount: item.budget.amount });
    } else {
      setEntry({ detail: item.expense.category, amount: item.expense.amount });
    }
    setItemId(item[item.type]._id);
    setIsEditing(true);
  };

  const handleClickCancel = () => {
    setEntry({ detail: "", amount: "" });
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      try {
        //update Budget or Expense and return message
        const data = await updateBudgetExpense(selectedType, itemId, entry);

        toast.success(data.message);

        const updatedBudgetPlan = await getBudgetPlan(budgetPlan._id);

        setBudgetPlan(updatedBudgetPlan);
        setEntry({ detail: "", amount: "" });
      } catch (error) {
        console.error("Error:", error);
      }
      setIsEditing(false);
    } else {
      try {
        //saving added Budget or Expense and returning updated BudgetPlan
        const updatedBudgetPlan = await addBudgetExpense(
          selectedType,
          entry,
          budgetPlan
        );

        toast.success(
          `${selectedType === "budget" ? "Budget" : "Expense"} added!`
        );
        setBudgetPlan(updatedBudgetPlan);
        setEntry({ detail: "", amount: "" });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDelete = async (type, itemId) => {
    setIsDisabled(true);

    // Handle Yes button click
    const handleYes = async () => {
      const { message } = await deleteBudgetExpense(type, itemId);

      toast.dismiss();
      toast.success(message);

      const updatedBudgetPlan = await getBudgetPlan(budgetPlan._id);
      setBudgetPlan(updatedBudgetPlan);

      //incase of editing
      setItemId("");
      setEntry({ detail: "", amount: "" });
      setIsEditing(false);

      setIsDisabled(false); // Re-enable the parent component
    };

    // Handle No button click
    const handleNo = () => {
      toast.dismiss();
      toast.error("Deletetion cancelled!");
      setIsDisabled(false); // Re-enable the parent component
    };

    toast.info(
      <div className="text-center p-6 bg-white rounded shadow-lg w-80">
        <p className="mb-4 text-lg">Are you sure you want to delete?</p>
        <div className="flex justify-between">
          <button
            onClick={handleYes}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false, // Prevent auto-close, waiting for user input
        closeButton: false, // No close button
        draggable: false, // Disable dragging the toast
        hideProgressBar: true, // Hide the progress bar
        className:
          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50", // Center the toast
      }
    );
  };

  return (
    <div className="p-6 bg-slate-300 min-h-screen">
      <div
        className={`transition-opacity duration-300 min-h-screen ${
          isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <h2 className="flex justify-center text-4xl text-black font-bold mb-4">
          Manage Your Budgets & Expenses
        </h2>

        <h2 className="text-3xl font-bold mb-4">{budgetPlan.planName}</h2>
        <h3 className="text-2xl pb-4">Remaining Budget: {remainingBudget}</h3>

        {/* Form for Adding/Editing Budget or Expense  */}
        <form onSubmit={handleSubmit} className="mb-6">
          {/* Dropdown to toggle between Budget and Expense */}
          <label htmlFor="entryType" className="mr-2">
            Select Type:
          </label>
          <select
            id="entryType"
            value={selectedType}
            onChange={handleDropdownChange}
            className="border rounded p-2 mr-2"
            disabled={isEditing}
          >
            <option value="budget">Budget</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            id="detail"
            value={entry.detail}
            onChange={handleInputChange}
            placeholder={
              selectedType === "budget" ? "Budget Source" : "Expense Category"
            }
            required
            className="border rounded p-2 mr-2"
          />
          <input
            type="text"
            id="amount"
            value={entry.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            required
            className="border rounded p-2 mr-2"
          />
          <button
            type="submit"
            className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            {isEditing
              ? `Update ${selectedType === "budget" ? "Budget" : "Expense"}`
              : `Add ${selectedType === "budget" ? "Budget" : "Expense"}`}
          </button>
          {isEditing ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
              onClick={handleClickCancel}
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </form>

        {/* Display Budgets or Expenses */}
        <div className="flex space-x-6">
          {/* Left side for Budgets */}
          <div className="w-1/2">
            <h3 className="text-xl font-bold mb-4">Budgets</h3>
            {budgetPlan.budgetsId.length > 0 ? (
              budgetPlan.budgetsId.map((budget) => (
                <BudgetCard
                  key={budget._id}
                  budget={budget}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-center text-2xl">No budgets to show.</p>
            )}
          </div>

          {/* Right side for Expenses */}
          <div className="w-1/2 h-auto">
            <h3 className="text-xl font-bold mb-4">Expenses</h3>
            {budgetPlan.expensesId.length > 0 ? (
              budgetPlan.expensesId.map((expense) => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-center text-2xl">No expenses to show.</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageBudgetPlan;
