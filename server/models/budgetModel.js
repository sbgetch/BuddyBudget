import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const budgetSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const BudgetModel = mongoose.model("Budget", budgetSchema);

export default BudgetModel;
