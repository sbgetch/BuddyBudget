//libraries
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetPlanCard = ({ budgetPlan, setBudgetPlan, handleClickDelete }) => {
  const navigate = useNavigate();

  // Calculate total budget and expenses
  const totalBudget =
    budgetPlan.budgetsId.length > 0
      ? budgetPlan.budgetsId.reduce((total, item) => total + item.amount, 0)
      : 0;

  const totalExpenses =
    budgetPlan.expensesId.length > 0
      ? budgetPlan.expensesId.reduce((total, item) => total + item.amount, 0)
      : 0;

  const remainingBudget = totalBudget - totalExpenses;

  // Data for the Chart.js bar chart
  const data = {
    labels: ["Remaining", "Budget", "Expenses"],
    datasets: [
      {
        label: "",
        data: [remainingBudget, totalBudget, totalExpenses],
        backgroundColor: [
          "rgba(153, 102, 255, 0.7)", // Color for 'Remaining'
          "rgba(75, 192, 192, 0.7)", // Color for 'Budget'
          "rgba(255, 99, 132, 0.7)", // Color for 'Expenses'
        ],
      },
    ],
  };

  const handleClickManage = () => {
    setBudgetPlan(budgetPlan);
    navigate(`/manage-budgetplan`);
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 shadow-2xl w-full rounded-lg py-8 gap-4">
      <h3 className="text-xl font-semibold lg:text-2xl">
        {budgetPlan.planName}
      </h3>
      <div className="flex flex-col w-full gap-4 px-4 lg:px-16  lg:justify-evenly xl:gap-12">
        <div className="flex flex-col items-center w-full justify-center my-4 ">
          <Bar data={data} />
        </div>
        <div className="flex items-center justify-center gap-4 px-4 xl:gap-20">
          <div className="flex flex-col gap-4 xl:flex-row">
            <p className="font-bold">
              Remaining Budget: ${totalBudget - totalExpenses}
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleClickManage} className="budgetBtn h-10 w-28">
              Manage
            </button>
            <button
              onClick={() => handleClickDelete(budgetPlan._id)}
              className="expenseBtn h-10 w-28"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanCard;
