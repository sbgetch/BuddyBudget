import express from "express";
import BudgetController from "../controllers/BudgetController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", BudgetController.list); //for test only
// router.get("/byBudgetPlan/:budgetPlanId", BudgetController.listByBudgetPlan);
router.post("/", BudgetController.create);
router.get("/:id", BudgetController.read);
router.put("/:id", BudgetController.update);
router.delete("/:id", BudgetController.delete);

export default router;
