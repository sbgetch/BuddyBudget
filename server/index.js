import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import connectDB from "./configs/db.js";

import authRoute from "./routes/authRoute.js";
import budgetPlanRoute from "./routes/budgetPlanRoute.js";
import budgetRoute from "./routes/budgetRoute.js";
import expenseRoute from "./routes/expenseRoute.js";

dotEnv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const api = "/api/v1";

connectDB();

//middlewares
app.use(express.json());
app.use(
  cors({ origin: "https://buddybudget-fe.onrender.com", credentials: true })
);
app.use(cookieParser());
app.use(helmet());

//routes
app.use(`${api}/auth`, authRoute);
app.use(`${api}/budgetPlans`, budgetPlanRoute);
app.use(`${api}/budgets`, budgetRoute);
app.use(`${api}/expenses`, expenseRoute);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
