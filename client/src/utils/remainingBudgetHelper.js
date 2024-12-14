const remainingBudget = (budgetPlan) => {
  const totalBudget =
    budgetPlan.budgetsId.length > 0
      ? budgetPlan.budgetsId.reduce((total, item) => total + item.amount, 0)
      : 0;

  const totalExpenses =
    budgetPlan.expensesId.length > 0
      ? budgetPlan.expensesId.reduce((total, item) => total + item.amount, 0)
      : 0;

  return totalBudget - totalExpenses;
};

export default remainingBudget;
