//libraries
import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ManageBudgetPlan from "./pages/ManageBudgetPlan";
import NotFound from "./pages/NotFound";

//context
import { AppContext } from "./context/AppContext";

//routes
import Public from "./routes/Public";
import Private from "./routes/Private";
import NewBudgetPlan from "./pages/NewBudgetPlan";

function App() {
  const { isLoggedIn, isDisabled } = useContext(AppContext);

  const [budgetPlan, setBudgetPlan] = useState([]);
  const [budgetPlans, setBudgetPlans] = useState([]);

  return (
    <>
      <Header
        className={`transition-opacity duration-300 ${
          isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
            <Route path="/" element={<Private />}>
              <Route
                path="dashboard"
                element={
                  <Dashboard
                    setBudgetPlan={setBudgetPlan}
                    budgetPlans={budgetPlans}
                    setBudgetPlans={setBudgetPlans}
                  />
                }
              />
              <Route
                path="newbudgetplan"
                element={<NewBudgetPlan setBudgetPlans={setBudgetPlans} />}
              />
              <Route
                path="manage-budgetplan"
                element={
                  <ManageBudgetPlan
                    budgetPlan={budgetPlan}
                    setBudgetPlan={setBudgetPlan}
                  />
                }
              />
            </Route>
          ) : (
            <Route path="/" element={<Public />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
