// rrd imports
import { useLoaderData } from "react-router-dom";

//helper function
import {
  calculateSpentByBudget,
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  wait,
} from "../helpers";

//components
import Intro from "../components/Intro.jsx";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import BudgetItem from "../components/BudgetItem.jsx";
import Table from "../components/Table.jsx";
import PieChart from "../components/PieChart.jsx"; // Import the PieChart component

//loader function
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets: budgets ?? [], expenses: expenses??[] };
}

//action
export async function dashboardAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      //create Budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses} = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome Back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>

                <h2>Budget Pie Charts</h2>
<div className="pie-charts">
  {budgets.map((budget, index) => (
    <PieChart
      key={budget.id}
      budget={budget}
      expenses={expenses}
      index={index} // Pass the index here
    />
  ))}
</div>

                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses.sort(
                        (a, b) => b.createdAt - a.createdAt
                      )}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
