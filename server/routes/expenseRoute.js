import express from "express";
import ExpenseController from "../controllers/ExpenseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", ExpenseController.list); //for test only
// router.get("/byBudgetPlan/:budgetPlanId", ExpenseController.listByBudgetPlan);
router.post("/", ExpenseController.create);
router.get("/:id", ExpenseController.read);
router.put("/:id", ExpenseController.update);
router.delete("/:id", ExpenseController.delete);

export default router;
