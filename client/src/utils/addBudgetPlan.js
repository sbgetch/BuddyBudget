import getRefreshToken from "./refreshToken";

const addBugetPlans = async (entry, userId) => {
  const { source, amount } = entry;
  const { refreshToken } = JSON.parse(localStorage.getItem("token"));
  const { accessToken } = await getRefreshToken(refreshToken);

  //saved new budget
  const addBudgetResponse = await fetch(
    `https://buddybudget-be.onrender.com/api/v1/budgets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ source, amount }),
    }
  );

  const addBudgetId = await addBudgetResponse.json();

  //saved new BudgetPlan
  await fetch("https://buddybudget-be.onrender.com/api/v1/budgetPlans/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      userId,
      planName: entry.planName,
      budgetsId: [addBudgetId],
      expensesId: [],
    }),
  });

  //getUpdated User's BudgetPlans and return it
  const response = await fetch(
    `https://buddybudget-be.onrender.com/api/v1/budgetPlans/?userId=${userId}&isDeleted=false`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
};

export default addBugetPlans;
