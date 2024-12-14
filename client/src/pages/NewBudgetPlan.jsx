//libraries
import { useState, useContext } from "react";

//context
import { AppContext } from "../context/AppContext";

//utils
import addBugetPlan from "../utils/addBudgetPlan";

const NewBudgetPlan = ({ setBudgetPlans, setIsAdding }) => {
  const { userId, isDisabled, setIsDisabled, submitError, setSubmitError } =
    useContext(AppContext);
  const [entry, setEntry] = useState({
    planName: "",
    source: "",
    amount: "",
  });

  const errorFunction = (error) => {
    setSubmitError(error);

    setTimeout(() => {
      setSubmitError("");
    }, 3000);
  };

  const handleInputChange = (event) => {
    setEntry({ ...entry, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const noBlankEntry =
        entry.planName !== "" && entry.source !== "" && entry.amount !== "";

      const amountRegex = new RegExp("^\\d+(\\.\\d{1,2})?$");

      if (!noBlankEntry) {
        errorFunction("Please complete all input boxes!");
      } else if (!amountRegex.test(entry.amount.toString())) {
        errorFunction("Amount should be positive and maximum of 2 decimals!");
      } else {
        //saving added Budget and Budget Plan and returning updated Budget Plans
        const updatedBudgetPlans = await addBugetPlan(entry, userId);

        setBudgetPlans(updatedBudgetPlans);

        setIsDisabled(false);
      }
    } catch (error) {
      console.log("Error", error);
    }

    setIsAdding(false);
  };

  const handleClickCancel = () => {
    setIsAdding(false);
    setIsDisabled(false);
  };

  return (
    <div
      className={
        isDisabled
          ? "bg-sky-50 p-8 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          : "hidden"
      }
    >
      <h2 className=" font-bold mb-6">Create a New Budget Plan</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="planName"
          >
            Plan Name
          </label>
          <input
            type="text"
            id="planName"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="income"
          >
            Budget Source
          </label>
          <input
            type="text"
            id="source"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expenses"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div>
            {submitError && <p className="redErrorText">{submitError}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-teal-300 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Create Plan
          </button>

          <button
            onClick={handleClickCancel}
            className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBudgetPlan;
