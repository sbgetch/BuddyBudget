import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const budgetPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: { type: String, required: true },
    budgetsId: [{ type: mongoose.Schema.Types.ObjectId, reF: "Budget" }],
    expensesId: [{ type: mongoose.Schema.Types.ObjectId, reF: "Expense" }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

budgetPlanSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

budgetPlanSchema.methods.restore = function () {
  this.isDeleted = false;
  return this.save();
};

const BudgetPlanModel = mongoose.model("BudgetPlan", budgetPlanSchema);

export default BudgetPlanModel;
