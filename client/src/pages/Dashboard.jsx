//libraries
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//context
import { AppContext } from "../context/AppContext";

//components
import BudgetPlanCard from "../components/BudgetPlanCard";
import NewBudgetPlan from "./NewBudgetPlan";

//utils
import getBudgetPlans from "../utils/getBudgetPlans";
import deleteBudgetPlan from "../utils/deleteBudgetPlan";

function Dashboard({ setBudgetPlan, budgetPlans, setBudgetPlans }) {
  const { userId, isDisabled, setIsDisabled, setSubmitError } =
    useContext(AppContext);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const data = await getBudgetPlans(userId);

        setBudgetPlans(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNewBudgetPlanClick = () => {
    setSubmitError("");
    setIsAdding(true);
    setIsDisabled((prev) => !prev);
  };

  const handleClickDelete = (itemId) => {
    setIsDisabled(true);

    // Handle Yes button click
    const handleYes = async () => {
      const { message } = await deleteBudgetPlan(itemId);

      toast.dismiss();
      toast.success(message);

      const updatedBudgetPlans = await getBudgetPlans(userId);
      setBudgetPlans(updatedBudgetPlans);

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
    <div className="bg-gradient-to-b from-slate-100 to-gray-500 min-h-screen px-6 2xl:px-16">
      <div
        className={`transition-opacity duration-300 ${
          isDisabled ? "opacity-30 pointer-events-none" : "opacity-100"
        } bg-gradient-to-b from-sky-100 to-slate-500 flex flex-col items-center min-h-screen gap-4 px-4 pb-4`}
      >
        <h2 className="pt-4">BUDGET PLANS</h2>
        <button
          className="loginBtn w-52 h-12 self-end mt-6"
          onClick={handleNewBudgetPlanClick}
        >
          New Budget Plan
        </button>

        {loading ? (
          <div className="flex justify-center items-center w-full mt-6">
            <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 w-12 h-12 rounded-full"></div>
            <p className="ml-4">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 auto-rows-auto gap-8 w-full mt-2">
            {budgetPlans && budgetPlans.length > 0 ? (
              budgetPlans.map((budgetPlan) => (
                <BudgetPlanCard
                  key={budgetPlan._id}
                  budgetPlan={budgetPlan}
                  setBudgetPlan={setBudgetPlan}
                  handleClickDelete={handleClickDelete}
                />
              ))
            ) : (
              <p className="text-center text-2xl">
                No budget plans to show, please create to view here
              </p>
            )}
          </div>
        )}
      </div>

      {isAdding ? (
        <NewBudgetPlan
          setBudgetPlans={setBudgetPlans}
          setIsAdding={setIsAdding}
        />
      ) : (
        <></>
      )}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
