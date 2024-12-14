// Actions
const ADD_BUDGET_PLAN = "ADD_BUDGET_PLAN";
const DELETE_BUDGET_PLAN = "DELETE_BUDGET_PLAN";
const ADD_BUDGET = "ADD_BUDGET";
const UPDATE_BUDGET = "UPDATE_BUDGET";
const DELETE_BUDGET = "DELETE_BUDGET";
const ADD_EXPENSE = "ADD_EXPENSE";
const UPDATE_EXPENSE = "UPDATE_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";

function profilesReducer(state, action) {
  switch (action.type) {
    case ADD_BUDGET_PLAN:
      const profilesAddBudgetPlan = state.map((profile) => {
        if (profile.userId === action.payload.userId) {
          return {
            ...profile,
            budgetPlans: profile.budgetPlans
              ? [
                  ...profile.budgetPlans,
                  {
                    budgetPlanId: action.payload.budgetPlanId,
                    planName: action.payload.planName,
                    budgets: [action.payload.budget],
                  },
                ]
              : [
                  {
                    budgetPlanId: action.payload.budgetPlanId,
                    planName: action.payload.planName,
                    budgets: [action.payload.budget],
                  },
                ],
          };
        }
        return profile;
      });

      localStorage.setItem("profiles", JSON.stringify(profilesAddBudgetPlan));

      return profilesAddBudgetPlan;

    case DELETE_BUDGET_PLAN:
      break;

    case ADD_BUDGET:
      const profilesAddBudget = state.map((profile) => {
        if (profile.userId !== action.payload.userId) return profile;

        const newBudgetPlans = profile.budgetPlans.map((budgetPlan) => {
          if (budgetPlan.budgetPlanId !== action.payload.budgetPlanId)
            return budgetPlan;

          return {
            ...budgetPlan,
            budgets: [...(budgetPlan.budgets || []), action.payload.newBudget],
          };
        });

        return {
          ...profile,
          budgetPlans: newBudgetPlans,
        };
      });

      localStorage.setItem("profiles", JSON.stringify(profilesAddBudget));

      return profilesAddBudget;

    case UPDATE_BUDGET:
      const profilesUpdateBudget = state.map((profile) => {
        if (profile.userId !== action.payload.userId) return profile;

        const updatedBudgetPlans = profile.budgetPlans.map((budgetPlan) => {
          if (budgetPlan.budgetPlanId !== action.payload.budgetPlanId)
            return budgetPlan;

          const updatedBudgets = budgetPlan.budgets.map((budget) =>
            budget.budgetId === action.payload.budgetId
              ? { ...budget, ...action.payload.updatedBudget }
              : budget
          );

          return { ...budgetPlan, budgets: updatedBudgets };
        });

        return { ...profile, budgetPlans: updatedBudgetPlans };
      });

      localStorage.setItem("profiles", JSON.stringify(profilesUpdateBudget));

      return profilesUpdateBudget;

    case DELETE_BUDGET:
      const profilesDeleteBudget = state.map((profile) => {
        if (profile.userId !== action.payload.userId) return profile;

        const updatedBudgetPlans = profile.budgetPlans.map((budgetPlan) => {
          if (budgetPlan.budgetPlanId !== action.payload.budgetPlanId)
            return budgetPlan;

          const updatedBudgets = budgetPlan.budgets.filter(
            (budget) => budget.budgetId !== action.payload.budgetId
          );

          return { ...budgetPlan, budgets: updatedBudgets };
        });

        return { ...profile, budgetPlans: updatedBudgetPlans };
      });

      localStorage.setItem("profiles", JSON.stringify(profilesDeleteBudget));

      return profilesDeleteBudget;

    case ADD_EXPENSE:
      const profilesAddExpense = state.map((profile) => {
        if (profile.userId !== action.payload.userId) return profile;

        const newBudgetPlans = profile.budgetPlans.map((budgetPlan) => {
          if (budgetPlan.budgetPlanId !== action.payload.budgetPlanId)
            return budgetPlan;

          return {
            ...budgetPlan,
            expenses: [
              ...(budgetPlan.expenses || []),
              action.payload.newExpense,
            ],
          };
        });

        return {
          ...profile,
          budgetPlans: newBudgetPlans,
        };
      });

      localStorage.setItem("profiles", JSON.stringify(profilesAddExpense));

      return profilesAddExpense;

    case UPDATE_EXPENSE:
      const profilesUpdateExpense = state.map((profile) => {
        if (profile.userId !== action.payload.userId) return profile;

        const updatedBudgetPlans = profile.budgetPlans.map((budgetPlan) => {
          if (budgetPlan.budgetPlanId !== action.payload.budgetPlanId)
            return budgetPlan;

          const updatedExpenses = budgetPlan.expenses.map((expense) =>
            expense.expenseId === action.payload.expenseId
              ? { ...expense, ...action.payload.updatedExpense }
              : expense
          );

          return { ...budgetPlan, expenses: updatedExpenses };
        });

        return { ...profile, budgetPlans: updatedBudgetPlans };
      });

      localStorage.setItem("profiles", JSON.stringify(profilesUpdateExpense));

      return profilesUpdateExpense;

    case DELETE_EXPENSE:
      const profilesDeleteExpense = state.map((profile) => {
        if (profile.userId !== action.payload.userId) return profile;

        const updatedBudgetPlans = profile.budgetPlans.map((budgetPlan) => {
          if (budgetPlan.budgetPlanId !== action.payload.budgetPlanId)
            return budgetPlan;

          const updatedExpenses = budgetPlan.expenses.filter(
            (expense) => expense.expenseId !== action.payload.expenseId
          );

          return { ...budgetPlan, expenses: updatedExpenses };
        });

        return { ...profile, budgetPlans: updatedBudgetPlans };
      });

      localStorage.setItem("profiles", JSON.stringify(profilesDeleteExpense));

      return profilesDeleteExpense;

    default:
      return state;
  }
}

export default profilesReducer;
