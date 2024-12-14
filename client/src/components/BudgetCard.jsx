const BudgetCard = ({ budget, handleEdit, handleDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-4 mb-2">
      <div className="flex gap-8">
        <p className="font-medium">Source: {budget.source}</p>
        <p className="font-medium">Amount: ${budget.amount}</p>
      </div>
      <div>
        <button
          onClick={() => handleEdit({ type: "budget", budget })}
          className="bg-teal-300 hover:bg-teal-400 text-white py-1 px-3 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete("budget", budget._id)}
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BudgetCard;
