import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import BudgetPlanController from "../controllers/BudgetPlanController.js";

const router = express.Router();

router.use(isAuthenticated);

// router.get("/?userId", BudgetPlanController.read);
router.get("/", BudgetPlanController.list); //for test only
router.post("/", BudgetPlanController.create);
router.get("/:id", BudgetPlanController.read);
router.put("/:id", BudgetPlanController.update);
router.delete("/:id", BudgetPlanController.delete);

export default router;
