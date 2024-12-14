import getRefreshToken from "./refreshToken";

const addBudgetExpense = async (selectedType, entry, budgetPlan) => {
  let setAddBody = {};
  if (selectedType === "budget") {
    setAddBody = { source: entry.detail, amount: entry.amount };
  } else {
    setAddBody = { category: entry.detail, amount: entry.amount };
  }
  const { refreshToken } = JSON.parse(localStorage.getItem("token"));
  const { accessToken } = await getRefreshToken(refreshToken);

  try {
    const response = await fetch(
      `https://buddybudget-be.onrender.com/api/v1/${selectedType}s`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(setAddBody),
      }
    );

    const data = await response.json();

    const budgetsId = budgetPlan.budgetsId.map((budget) => budget._id);
    const expensesId = budgetPlan.expensesId.map((expense) => expense._id);

    if (selectedType === "budget") {
      budgetsId.push(data._id);
    } else {
      expensesId.push(data._id);
    }

    const updatedBudgetPlan = { ...budgetPlan, budgetsId, expensesId };

    //updating the Budget Plan
    const responseBudgetPlan = await fetch(
      `https://buddybudget-be.onrender.com/api/v1/budgetPlans/${budgetPlan._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedBudgetPlan),
      }
    );

    return await responseBudgetPlan.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

export default addBudgetExpense;
