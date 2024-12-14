import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const expenseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model("Expense", expenseSchema);

export default ExpenseModel;
